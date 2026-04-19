<script setup lang="ts">
import { nextTick, watch } from 'vue';

import type { Reminder as ReminderType } from '@/@types';

import { useNowByMinute } from '@/composables/common/useNowByMinute.ts';

import { Reminder, ReminderEdit } from './components';

type Props = {
  reminders: ReminderType[];
  isLoading: boolean;
  errorMessage: string | null;
  isEditing: boolean;
  lastTouchedReminderId: string | null;
};

const props = defineProps<Props>();

const reminderRefs = new Map<string, HTMLElement>();

const setReminderRef = (id: string, el: HTMLElement | null) => {
  if (el) {
    reminderRefs.set(id, el);
    return;
  }

  reminderRefs.delete(id);
};

watch(
  [() => props.lastTouchedReminderId, () => props.reminders],
  ([id]) => {
    if (!id) {
      return;
    }

    nextTick(() => {
      reminderRefs.get(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  },
);

const { now } = useNowByMinute();
</script>

<template>
  <div class="Reminders FullWidth">
    <div v-if="isLoading">
      Loading...
    </div>

    <div v-if="errorMessage">
      Ошибка: {{ errorMessage }}
    </div>

    <div v-if="!isEditing" class="RemindersWrapper">
      <div
        v-for="reminderCur in reminders"
        :key="reminderCur.id"
        :ref="(el) => setReminderRef(reminderCur.id, el as HTMLElement)"
        class="FullWidth"
      >
        <Reminder
          :key="`${reminderCur.id}___${now.getTime()}`"
          :reminder="reminderCur"
        />
      </div>
    </div>

    <ReminderEdit v-if="isEditing" class="FullWidth" />
  </div>
</template>

<style scoped lang="scss">
.Reminders {
  height: 100%;
}

.RemindersWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-16);
  width: 100%;
}

.FullWidth {
  width: 100%;
}
</style>
