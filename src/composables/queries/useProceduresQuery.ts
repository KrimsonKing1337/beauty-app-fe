import { useQuery } from '@tanstack/vue-query';
import { getProcedures } from '@/api/procedures';

export const useProceduresQuery = () =>
  useQuery({
    queryKey: ['procedures'],
    queryFn: getProcedures,
  });
