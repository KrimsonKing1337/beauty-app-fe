import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { deleteReminder } from '@/api/reminders';

export const useDeleteReminderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReminder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['reminders'],
      });
    },
  });
};
