import { useQuery } from '@tanstack/vue-query';

import { getProcedurePlaces } from '@/api/procedurePlaces.ts';

export const useProcedurePlacesQuery = () => {
  return useQuery({
    queryKey: ['procedurePlaces'],
    queryFn: getProcedurePlaces,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
