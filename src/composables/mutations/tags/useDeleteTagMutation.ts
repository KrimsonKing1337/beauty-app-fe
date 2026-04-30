import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { deleteTag } from '@/api/tags';

export const useDeleteTagMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};
