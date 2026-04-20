import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { createReminder } from '@/api/reminders';

import {
  ensureReminderNotificationsPermission,
  syncReminderNotification,
} from '@/utils/reminderNotifications';

export const useCreateReminderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReminder,
    onSuccess: async (createdReminder) => {
      await queryClient.invalidateQueries({
        queryKey: ['reminders'],
      });

      const hasPermission = await ensureReminderNotificationsPermission();

      if (!hasPermission) {
        return;
      }

      await syncReminderNotification(createdReminder);
    },
  });
};
