import { authTokenStorage } from './authTokenStorage';

type RefreshResponseDto = {
  accessToken: string;
  refreshToken?: string;
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = authTokenStorage.getRefreshToken();

  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }

  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Refresh request failed with status ${response.status}`);
  }

  const data = (await response.json()) as RefreshResponseDto;

  authTokenStorage.setAccessToken(data.accessToken);

  if (data.refreshToken) {
    authTokenStorage.setRefreshToken(data.refreshToken);
  }

  return data.accessToken;
};
