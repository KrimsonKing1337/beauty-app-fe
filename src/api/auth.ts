import { apiClient } from './client.ts';
import { authTokenStorage } from './authTokenStorage';

type LoginPayloadDto = {
  login: string;
  password: string;
};

type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
};

type MeDto = {
  userId: string;
  login: string;
  name: string;
};

export const login = async (payload: LoginPayloadDto): Promise<void> => {
  const data = await apiClient<LoginResponseDto>('/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    retryOnUnauthorized: false,
  });

  authTokenStorage.setTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
};

export const logout = (): void => {
  authTokenStorage.clearTokens();
};

export const getMe = async (): Promise<MeDto> => {
  return apiClient<MeDto>('/me', {
    method: 'GET',
  });
};
