<script setup lang="ts">
import { computed, inject, ref } from 'vue';

import type { Reminder } from '@/@types';

import { useRemindersStore } from '@/stores/remindersStore';

import {
  useDeleteReminderMutation,
} from '@/composables/mutations/reminders/useDeleteReminderMutation';

import {
  useUpdateReminderMutation,
} from '@/composables/mutations/reminders/useUpdateReminderMutation';

import { getToggleReminderCompletePayload } from '@/pages/RemindersPage/components/Reminders/utils';

import { reminderCardsContextKey } from '@/pages/RemindersPage/reminderCardsContext';

import { CardHeader, RemovingDialog } from '@/components';

const props = defineProps<{
  reminder: Reminder;
  leftTop: string;
  leftBottom: string;
  rightTop: string;
  rightBottom: string;
}>();

const remindersStore = useRemindersStore();
const deleteReminderMutation = useDeleteReminderMutation();
const updateReminderMutation = useUpdateReminderMutation();

const completed = computed(() => {
  return {
    label: props.reminder.isCompleted ? 'Отменить' : 'Завершить',
    icon: props.reminder.isCompleted ? 'mdi-arrow-u-left-top ' : 'mdi-check-all',
  };
});

const reminderCardsContext = inject(reminderCardsContextKey);
const cards = computed(() => reminderCardsContext?.cards.value ?? []);

const handlerToggleReminderComplete = async (reminder: Reminder) => {
  await updateReminderMutation.mutateAsync({
    id: reminder.id,
    payload: getToggleReminderCompletePayload(reminder),
  });
};

const handleRemoveReminder = async (id: string) => {
  const index = cards.value.findIndex((reminder) => reminder.id === id);

  if (index === -1) {
    return;
  }

  const prevId = cards.value[index - 1]?.id ?? null;
  const nextId = cards.value[index + 1]?.id ?? null;

  await deleteReminderMutation.mutateAsync(id);

  if (remindersStore.editingReminderId === id) {
    remindersStore.clearDraft();
  }

  if (remindersStore.lastTouchedReminderId === id) {
    remindersStore.setLastTouchedReminderId(nextId ?? prevId);
  }
};

const dialogIsOpen = ref(false);

const menuItems = computed(() => [
  {
    id: 'complete',
    label: completed.value.label,
    icon: completed.value.icon,
    action: () => {
      handlerToggleReminderComplete(props.reminder);
    },
  },
  {
    id: 'edit',
    label: 'Редактировать',
    icon: 'mdi-pencil',
    action: () => {
      remindersStore.startEditReminder(props.reminder);
    },
  },
  {
    id: 'delete',
    label: 'Удалить',
    icon: 'mdi-trash-can',
    class: 'MenuDeleteButton',
    action: () => {
      dialogIsOpen.value = true;
    },
  },
]);

const confirmHandler = () => {
  handleRemoveReminder(props.reminder.id);

  dialogIsOpen.value = false;
};
</script>

<template>
  <CardHeader
    :left-top="props.leftTop"
    :left-bottom="props.leftBottom"
    :right-top="props.rightTop"
    :right-bottom="props.rightBottom"
    :menu-items="menuItems"
  />

  <RemovingDialog
    :is-open="dialogIsOpen"
    @close="dialogIsOpen = false"
    @confirm="confirmHandler"
  />
</template>

<style scoped lang="scss">

</style>
