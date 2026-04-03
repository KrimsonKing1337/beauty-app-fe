import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import type { AuthUser } from '@/@types';

import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from '@/api/client';

export type SetAuthParams = {
  accessToken: string;
  user: AuthUser;
};

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(getAccessToken());
  const user = ref<AuthUser | null>(null);

  const isAuthenticated = computed(() => {
    return Boolean(accessToken.value);
  });

  const setAuth = (params: SetAuthParams) => {
    accessToken.value = params.accessToken;
    user.value = params.user;

    setAccessToken(params.accessToken);
  };

  const setUser = (nextUser: AuthUser | null) => {
    user.value = nextUser;
  };

  const clearAuth = () => {
    accessToken.value = null;
    user.value = null;

    removeAccessToken();
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
