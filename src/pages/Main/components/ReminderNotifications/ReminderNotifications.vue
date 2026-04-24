<script setup lang="ts">
import { computed, ref } from 'vue';

import { useRouter } from 'vue-router';

import type { Reminder as ReminderType } from '@/@types';

import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery.ts';
import { useUpdateReminderMutation } from '@/composables/mutations/reminders/useUpdateReminderMutation.ts';
import { useNow } from '@/composables/common/useNow.ts';

import { formatReminderDate } from '@/pages/RemindersPage/components/Reminders/utils';

import { ReminderNotification } from '@/components';

const router = useRouter();

const { data } = useRemindersQuery();
const updateReminderMutation = useUpdateReminderMutation();

const { now } = useNow();

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
  <TransitionGroup name="notifications" tag="div" class="ReminderNotifications">
    <ReminderNotification
      v-for="reminderCur in filteredRemindersWithFormattedDate.filter(shouldShowNotification)"
      :id="reminderCur.id"
      :key="reminderCur.id"

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
  </TransitionGroup>
</template>

<style scoped lang="scss">
.ReminderNotifications {
  position: absolute;
  z-index: 10;
  top: 25px;
  right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;

  @media (max-width: 480px) {
    top: 5px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}

.notifications-enter-active,
.notifications-leave-active,
.notifications-move {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.notifications-enter-from,
.notifications-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

.notifications-leave-active {
  position: absolute;
}
</style>
