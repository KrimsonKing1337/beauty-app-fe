import type { LoginPayload, LoginResponseDto, MeResponseDto } from '@/@types';

import { apiClient } from './client';

const AUTH_API_PATH = '/api/auth';

export const login = async (
  payload: LoginPayload,
): Promise<LoginResponseDto> => {
  return apiClient<LoginResponseDto>(`${AUTH_API_PATH}/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const getMe = async (): Promise<MeResponseDto> => {
  return apiClient<MeResponseDto>(`${AUTH_API_PATH}/me`, {
    method: 'GET',
  });
};
