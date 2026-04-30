import { useQuery } from '@tanstack/vue-query';

import { getTags } from '@/api/tags.ts';

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });
};
