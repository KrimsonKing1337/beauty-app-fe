import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { deleteProcedure } from '@/api/procedures';

export const useDeleteProcedureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProcedure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procedures'] });
    },
  });
};
