import {
  computed,
  unref,
  type Ref,
} from 'vue';

import { useQuery } from '@tanstack/vue-query';

import type {
  ProceduresQueryParams,
  Pagination,
} from '@/@types';

import { getProceduresPage } from '@/api/procedures';

type MaybeRef<T> = T | Ref<T>;

const defaultPagination: Pagination = {
  page: 1,
  limit: 100,
  total: 0,
  totalPages: 0,
};

export const useProceduresQuery = (
  params?: MaybeRef<ProceduresQueryParams>,
) => {
  const queryParams = computed<ProceduresQueryParams>(() => {
    return {
      page: 1,
      limit: params ? 20 : 100,
      sortBy: 'dateTime',
      sortOrder: 'desc',
      ...(params ? unref(params) : {}),
    };
  });

  const query = useQuery({
    queryKey: computed(() => [
      'procedures',
      queryParams.value,
    ]),
    queryFn: () => getProceduresPage(queryParams.value),
  });

  const data = computed(() => {
    return query.data.value?.items;
  });

  const pagination = computed(() => {
    return query.data.value?.pagination ?? defaultPagination;
  });

  return {
    ...query,
    data,
    pagination,
  };
};
