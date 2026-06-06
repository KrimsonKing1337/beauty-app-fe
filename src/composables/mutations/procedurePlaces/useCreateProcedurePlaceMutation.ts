import { useMutation, useQueryClient } from '@tanstack/vue-query';

import type { CreateProcedurePlacePayload } from '@/@types';

import { createProcedurePlace } from '@/api/procedurePlaces';

export const useCreateProcedurePlaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProcedurePlacePayload) => {
      return createProcedurePlace(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['procedurePlaces'] });
    },
  });
};
