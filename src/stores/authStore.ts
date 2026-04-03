import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import type { AuthUser } from '@/@types';

import { authTokenStorage } from '@/api/authTokenStorage';

export type SetAuthParams = {
  accessToken: string;
  user: AuthUser;
};

export const useAuthStore = defineStore('auth', () => {
  const token = authTokenStorage.getAccessToken();
  const accessToken = ref<string | null>(token);
  const user = ref<AuthUser | null>(null);

  const isAuthenticated = computed(() => {
    return Boolean(accessToken.value);
  });

  const setAuth = (params: SetAuthParams) => {
    accessToken.value = params.accessToken;
    user.value = params.user;

    authTokenStorage.setAccessToken(params.accessToken);
  };

  const setUser = (nextUser: AuthUser | null) => {
    user.value = nextUser;
  };

  const clearAuth = () => {
    accessToken.value = null;
    user.value = null;

    authTokenStorage.clearTokens();
  };

  return {
    accessToken,
    user,
    isAuthenticated,
    setAuth,
    clearAuth,
    setUser,
  };
});
