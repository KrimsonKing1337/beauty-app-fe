import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { deleteProcedurePlace } from '@/api/procedurePlaces';

export const useDeleteProcedurePlaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProcedurePlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procedurePlaces'] });
    },
  });
};
