import { useQuery } from '@tanstack/vue-query';

import { getMe } from '@/api/auth';

import { useAuthStore } from '@/stores/authStore';

export const useMeQuery = () => {
  const authStore = useAuthStore();

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    enabled: authStore.isAuthenticated,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
