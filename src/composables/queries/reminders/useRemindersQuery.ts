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

type MaybeRef<T> = T | Ref<T>;

const defaultPagination: ReminderPagination = {
  page: 1,
  limit: 100,
  total: 0,
  totalPages: 0,
};

export const useRemindersQuery = (
  params?: MaybeRef<RemindersQueryParams>,
) => {
  const queryParams = computed<RemindersQueryParams>(() => {
    return {
      page: 1,
      limit: params ? 20 : 100,
      sortBy: 'dateTime',
      sortOrder: 'asc',
      includeProcedureReminders: true,
      ...(params ? unref(params) : {}),
    };
  });

  const query = useQuery({
    queryKey: computed(() => [
      'reminders',
      queryParams.value,
    ]),
    queryFn: () => getRemindersPage(queryParams.value),
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
