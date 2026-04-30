import { useMutation, useQueryClient } from '@tanstack/vue-query';

import type { CreateTagPayload } from '@/@types';

import { createTag } from '@/api/tags';

export const useCreateTagMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTagPayload) => {
      return createTag(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};
