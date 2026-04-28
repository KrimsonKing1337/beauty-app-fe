import { useQuery } from '@tanstack/vue-query';

import { getProcedureTypes } from '@/api/procedureTypes.ts';

export const useProcedureTypesQuery = () => {
  return useQuery({
    queryKey: ['procedureTypes'],
    queryFn: getProcedureTypes,
  });
};
