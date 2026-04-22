<script setup lang="ts">
import { computed, ref } from 'vue';

import type { Reminder } from '@/@types';


import { useRemindersStore } from '@/stores/remindersStore.ts';

import {
  useDeleteReminderMutation,
} from '@/composables/mutations/reminders/useDeleteReminderMutation.ts';

import {
  useUpdateReminderMutation,
} from '@/composables/mutations/reminders/useUpdateReminderMutation.ts';

import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery.ts';

import { getToggleReminderCompletePayload } from '@/pages/RemindersPage/components/Reminders/utils';

import { CardHeader } from '@/components';

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

const dialogIsOpen = ref(false);

const menuItems = computed(() => [
  {
    id: 'complete',
    label: completed.value.label,
    icon: 'mdi-check-all',
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

const btnRemoveCardClickHandler = () => {
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

  <VDialog v-model="dialogIsOpen" max-width="500">
    <VCard
      prepend-icon="mdi-exclamation-thick"
      title="Точно удалить?"
      text="Это действие отменить нельзя"
    >
      <template #actions>
        <VSpacer></VSpacer>

        <VBtn @click="dialogIsOpen = false">
          Не удалять
        </VBtn>

        <VBtn color="red" @click="btnRemoveCardClickHandler">
          Удалить
        </VBtn>
      </template>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">

</style>
