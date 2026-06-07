import {
  computed,
  unref,
  type Ref,
} from 'vue';

import { useQuery } from '@tanstack/vue-query';

import type {
  RemindersQueryParams,
  ReminderPagination,
} from '@/@types';

import { getRemindersPage } from '@/api/reminders';

import { buildRemindersQueryParams } from './buildRemindersQueryParams';

type MaybeRef<T> = T | Ref<T>;

type UseRemindersQueryArgs = MaybeRef<RemindersQueryParams> & {
  enabled?: boolean;
};

const defaultPagination: ReminderPagination = {
  page: 1,
  limit: 100,
  total: 0,
  totalPages: 0,
};

export const useRemindersQuery = (
  params?: UseRemindersQueryArgs,
) => {
  const safeParams = params ? unref(params) : {};

  const queryParams = computed(() =>
    buildRemindersQueryParams(safeParams),
  );

  const query = useQuery({
    queryKey: computed(() => [
      'reminders',
      queryParams.value,
    ]),
    queryFn: () => getRemindersPage(queryParams.value),
    enabled: params?.enabled ?? true,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
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
