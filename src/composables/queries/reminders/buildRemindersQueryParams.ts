import { unref, type MaybeRef } from 'vue';

import type { RemindersQueryParams } from '@/@types';

export const buildRemindersQueryParams = (
  params?: MaybeRef<Partial<RemindersQueryParams>>,
): RemindersQueryParams => ({
  page: 1,
  limit: 100,
  sortBy: 'dateTime',
  sortOrder: 'asc',
  includeProcedureReminders: true,
  ...(params ? unref(params) : {}),
});
