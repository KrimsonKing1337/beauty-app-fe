import { useMutation, useQueryClient } from '@tanstack/vue-query';

import type {
  CreateProcedurePayload,
  UpdateProcedurePayload,
} from '@/@types';

import {
  createProcedure,
  updateProcedure,
} from '@/api/procedures';

type SaveProcedurePayload = ({ id?: undefined } & CreateProcedurePayload) | UpdateProcedurePayload;

export const useSaveProcedureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SaveProcedurePayload) => {
      if ('id' in payload && payload.id) {
        return updateProcedure(payload);
      }

      return createProcedure(payload as CreateProcedurePayload);
    },
    onSuccess: (savedProcedure) => {
      queryClient.invalidateQueries({ queryKey: ['procedures'] });

      return savedProcedure;
    },
  });
};
