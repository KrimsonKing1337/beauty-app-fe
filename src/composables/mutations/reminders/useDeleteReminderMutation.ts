import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { deleteReminder } from '@/api/reminders';

import { removeReminderNotification } from '@/utils/reminderNotifications';

export const useDeleteReminderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReminder,
    onSuccess: async (_, deletedReminderId) => {
      await queryClient.invalidateQueries({
        queryKey: ['reminders'],
      });

      await removeReminderNotification(deletedReminderId);
    },
  });
};
