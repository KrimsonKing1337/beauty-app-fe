import { useQuery } from '@tanstack/vue-query';

import { getReminders } from '@/api/reminders';

export const useRemindersQuery = () => {
  return useQuery({
    queryKey: ['reminders'],
    queryFn: getReminders,
  });
};
