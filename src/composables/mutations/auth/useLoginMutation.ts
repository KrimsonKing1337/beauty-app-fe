import { useMutation } from '@tanstack/vue-query';

import type { LoginPayload } from '@/@types';

import { login } from '@/api/auth';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => {
      return login(payload);
    },
  });
};
