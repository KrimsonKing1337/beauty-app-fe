import { apiClient } from './client.ts';
import { authTokenStorage } from './authTokenStorage';

type LoginPayloadDto = {
  login: string;
  password: string;
};

type AuthUserDto = {
  userId: string;
  login: string;
  name: string;
};

type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
  user: AuthUserDto;
};

type MeDto = {
  user: {
    id: string;
    login: string;
    name: string;
  }
};

export const login = async (
  payload: LoginPayloadDto,
): Promise<LoginResponseDto> => {
  const data = await apiClient<LoginResponseDto>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    retryOnUnauthorized: false,
  });

  authTokenStorage.setTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  return data;
};

export const getMe = async (): Promise<MeDto> => {
  return apiClient<MeDto>('/auth/me', {
    method: 'GET',
  });
};
