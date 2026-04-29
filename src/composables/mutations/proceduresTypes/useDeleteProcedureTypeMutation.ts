import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { deleteProcedureType } from '@/api/procedureTypes';

export const useDeleteProcedureTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProcedureType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procedureTypes'] });
    },
  });
};
