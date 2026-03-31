import { useMutation, useQueryClient } from '@tanstack/vue-query';
import {
  type CreateProcedurePayload,
  type UpdateProcedurePayload,
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

      return createProcedure(payload);
    },
    onSuccess: (savedProcedure) => {
      queryClient.invalidateQueries({ queryKey: ['procedures'] });

      return savedProcedure;
    },
  });
};
