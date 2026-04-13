<script setup lang="ts">
import { computed } from 'vue';

import { type Reminder, useRemindersStore } from '@/stores/remindersStore.ts';

import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery.ts';
import {
  useDeleteReminderMutation,
} from '@/composables/mutations/reminders/useDeleteReminderMutation.ts';

import {
  useUpdateReminderMutation,
} from '@/composables/mutations/reminders/useUpdateReminderMutation.ts';

import { CardHeader } from '@/components';
import { getToggleReminderCompletePayload } from '@/components/Reminders/utils';

const props = defineProps<{
  reminder: Reminder;
  leftTop: string;
  leftBottom: string;
  rightTop: string;
  rightBottom: string;
}>();

const remindersStore = useRemindersStore();
const proceduresQuery = useRemindersQuery();
const deleteProcedureMutation = useDeleteReminderMutation();
const updateReminderMutation = useUpdateReminderMutation();

const completed = computed(() => {
  return {
    label: props.reminder.isCompleted ? 'Отменить' : 'Завершить',
  };
});

const handlerToggleReminderComplete = async (reminder: Reminder) => {
  await updateReminderMutation.mutateAsync({
    id: reminder.id,
    payload: getToggleReminderCompletePayload(reminder),
  });
};

const handleRemoveReminder = async (id: string) => {
  const cards = proceduresQuery.data.value ?? [];
  const index = cards.findIndex((reminder) => reminder.id === id);

  if (index === -1) {
    return;
  }

  const prevId = cards[index - 1]?.id ?? null;
  const nextId = cards[index + 1]?.id ?? null;

  await deleteProcedureMutation.mutateAsync(id);

  if (remindersStore.editingReminderId === id) {
    remindersStore.clearDraft();
  }

  if (remindersStore.lastTouchedReminderId === id) {
    remindersStore.setLastTouchedReminderId(nextId ?? prevId);
  }
};

const menuItems = computed(() => [
  {
    label: completed.value.label,
    icon: 'pi pi-check',
    command: () => {
      handlerToggleReminderComplete(props.reminder);
    },
  },
  {
    label: 'Редактировать',
    icon: 'pi pi-pencil',
    command: () => {
      remindersStore.startEditReminder(props.reminder);
    },
  },
  {
    label: 'Удалить',
    icon: 'pi pi-trash',
    class: 'MenuDeleteButton',
    command: () => {
      handleRemoveReminder(props.reminder.id);
    },
  },
]);

</script>

<template>
  <CardHeader
    :leftTop="props.leftTop"
    :leftBottom="props.leftBottom"
    :rightTop="props.rightTop"
    :rightBottom="props.rightBottom"
    :menuItems="menuItems"
  />
</template>

<style scoped lang="scss">

</style>
