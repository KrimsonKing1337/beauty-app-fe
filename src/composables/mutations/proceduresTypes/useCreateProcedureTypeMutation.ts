import { useMutation, useQueryClient } from '@tanstack/vue-query';

import type { CreateProcedureTypePayload } from '@/@types';

import { createProcedureType } from '@/api/procedureTypes';

export const useCreateProcedureTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProcedureTypePayload) => {
      return createProcedureType(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procedureTypes'] });
    },
  });
};
