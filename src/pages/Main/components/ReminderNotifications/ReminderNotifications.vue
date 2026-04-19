<script setup lang="ts">
import { computed } from 'vue';

import { useRouter } from 'vue-router';

import type { Reminder as ReminderType } from '@/@types';

import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery.ts';
import { useUpdateReminderMutation } from '@/composables/mutations/reminders/useUpdateReminderMutation.ts';

import { formatReminderDate } from '@/pages/RemindersPage/components/Reminders/utils';

import { ReminderNotification } from '@/components';

const router = useRouter();

const { data } = useRemindersQuery();
const updateReminderMutation = useUpdateReminderMutation();

const reminders = computed<ReminderType[]>(() => data.value ?? []);

const remindersWithFormattedDate = computed(() => {
  return reminders.value.map((reminderCur) => {
    return {
      ...reminderCur,
      formattedDate: formatReminderDate(reminderCur.dateTime),
    };
  });
});

const filteredRemindersWithFormattedDate = computed(() => {
  return remindersWithFormattedDate.value.filter((reminderCur) => {
    return reminderCur.formattedDate.isPast && !reminderCur.isCompleted;
  });
});

const handleComplete = (id: string) => {
  updateReminderMutation.mutateAsync({
    id,
    payload: { isCompleted: true },
  });
};

const handleSnooze = (id: string) => {
  const dateTimePlus15Minutes = new Date(new Date().getTime() + 15 * 60_000);

  updateReminderMutation.mutateAsync({
    id,
    payload: { dateTime: dateTimePlus15Minutes },
  });
};

const handleOpen = (id: string) => {
  router.push(`/reminders/${id}`);
};

const handleClose = (id: string) => {
  console.log('___ handle close id', id);
};
</script>

<template>
  <div class="ReminderNotifications">
    <ReminderNotification
      v-for="reminderCur in filteredRemindersWithFormattedDate"
      :id="reminderCur.id"
      :key="reminderCur.id"

      :title="reminderCur.name"
      :description="reminderCur.description"
      :scheduled-label="reminderCur.formattedDate.main"
      :overdue-label="reminderCur.formattedDate.relative"
      :is-overdue="reminderCur.formattedDate.isPast"

      @complete="handleComplete"
      @snooze="handleSnooze"
      @close="handleClose"
      @open="handleOpen"
    />
  </div>
</template>

<style scoped lang="scss">
.ReminderNotifications {
  position: absolute;
  z-index: 1;
  top: 25px;
  right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
}
</style>
