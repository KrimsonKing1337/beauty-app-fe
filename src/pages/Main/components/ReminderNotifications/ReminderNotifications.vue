<script setup lang="ts">
import { computed, ref } from 'vue';

import { useRouter } from 'vue-router';

import type { Reminder as ReminderType } from '@/@types';

import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery.ts';
import { useUpdateReminderMutation } from '@/composables/mutations/reminders/useUpdateReminderMutation.ts';
import { useSyncedNow } from '@/composables/common/useSyncedNow.ts';

import { formatReminderDate } from '@/pages/RemindersPage/components/Reminders/utils';

import { ReminderNotification } from '@/components';

const router = useRouter();

const { data } = useRemindersQuery();
const updateReminderMutation = useUpdateReminderMutation();

const { now } = useSyncedNow();

const hiddenNotificationIds = ref<Set<string>>(new Set());

type ReminderComputed = ReminderType & {
  isHidden?: boolean;
};

const reminders = computed<ReminderComputed[]>(() => {
  const arr = data.value ?? [];

  return arr.map((itemCur) => {
    if (hiddenNotificationIds.value.has(itemCur.id)) {
      return {
        ...itemCur,
        isHidden: true,
      };
    }

    return itemCur;
  });
});

const remindersWithFormattedDate = computed(() => {
  const currentNow = now.value;

  return reminders.value.map((reminderCur) => {
    return {
      ...reminderCur,
      formattedDate: formatReminderDate({
        date: reminderCur.dateTime,
        currentNow,
        minutesBefore: reminderCur.notifications.minutesBefore,
      }),
    };
  });
});

const filteredRemindersWithFormattedDate = computed(() => {
  return remindersWithFormattedDate.value.filter((reminderCur) => {
    return !reminderCur.isCompleted;
  });
});

const handleComplete = (id: string) => {
  updateReminderMutation.mutate({
    id,
    payload: { isCompleted: true },
  });
};

const handleSnooze = (id: string) => {
  const dateTimePlus15Minutes = new Date(Date.now() + 15 * 60_000);
  dateTimePlus15Minutes.setSeconds(0, 0);

  updateReminderMutation.mutate({
    id,
    payload: { dateTime: dateTimePlus15Minutes },
  });
};

const handleOpen = (id: string) => {
  router.push({
    path: '/reminders',
    query: {
      scrollTo: id,
    },
  });
};

const handleClose = (id: string) => {
  hiddenNotificationIds.value = new Set([
    ...hiddenNotificationIds.value,
    id,
  ]);
};

const shouldShowNotification = (reminderCur: typeof remindersWithFormattedDate.value[number]) => {
  return reminderCur.formattedDate.due === 'isPast'
    || (!!reminderCur.formattedDate.due && !reminderCur.isHidden);
};
</script>
<template>
  <div class="ReminderNotifications">
    <div
      v-for="reminderCur in filteredRemindersWithFormattedDate"
      :key="reminderCur.id"
    >
      <ReminderNotification
        v-if="shouldShowNotification(reminderCur)"
        :id="reminderCur.id"
        :title="reminderCur.name"
        :description="reminderCur.description"
        :scheduled-label="reminderCur.formattedDate.main"
        :due-label="reminderCur.formattedDate.relative"
        :due="reminderCur.formattedDate.due"

        @complete="handleComplete"
        @snooze="handleSnooze"
        @close="handleClose"
        @open="handleOpen"
      />
    </div>
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
