import { useMutation, useQueryClient } from '@tanstack/vue-query';

import type { UpdateReminderPayload } from '@/@types';

import { updateReminder } from '@/api/reminders';


type UpdateReminderMutationArgs = {
  id: string;
  payload: UpdateReminderPayload;
};

export const useUpdateReminderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateReminderMutationArgs) => {
      return updateReminder(id, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['reminders'],
      });
    },
  });
};
