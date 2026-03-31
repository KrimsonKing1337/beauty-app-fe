import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { createReminder } from '@/api/reminders';

export const useCreateReminderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReminder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['reminders'],
      });
    },
  });
};
