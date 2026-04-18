import { useQuery } from '@tanstack/vue-query';

import { getProcedures } from '@/api/procedures';

export const useProceduresQuery = () => {
  return useQuery({
    queryKey: ['procedures'],
    queryFn: getProcedures,
  });
};
