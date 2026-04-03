import { authTokenStorage } from './authTokenStorage';
import { refreshAccessToken } from './refreshAccessToken';

type RequestHeaders = Record<string, string>;

type ApiClientOptions = Omit<RequestInit, 'headers'> & {
  headers?: RequestHeaders;
  retryOnUnauthorized?: boolean;
};

let refreshPromise: Promise<string> | null = null;

const getFreshAccessToken = async (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

const buildHeaders = (
  accessToken: string | null,
  customHeaders: RequestHeaders = {},
  body?: BodyInit | null,
): HeadersInit => {
  const headers: RequestHeaders = {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...customHeaders,
  };

  if (!(body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

const parseResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

export const apiClient = async <T>(
  path: string,
  options: ApiClientOptions = {},
): Promise<T> => {
  const {
    headers,
    retryOnUnauthorized = true,
    body,
    ...restOptions
  } = options;

  const accessToken = authTokenStorage.getAccessToken();

  const response = await fetch(path, {
    ...restOptions,
    body,
    headers: buildHeaders(accessToken, headers, body),
  });

  if (response.status === 401 && retryOnUnauthorized) {
    try {
      const freshAccessToken = await getFreshAccessToken();

      const retryResponse = await fetch(path, {
        ...restOptions,
        body,
        headers: buildHeaders(freshAccessToken, headers, body),
      });

      if (!retryResponse.ok) {
        throw new Error(`Request failed with status ${retryResponse.status}`);
      }

      return parseResponse<T>(retryResponse);
    } catch (error) {
      authTokenStorage.clearTokens();
      throw error;
    }
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return parseResponse<T>(response);
};
