<script setup lang="ts">
import { nextTick, watch } from 'vue';

import type { Reminder as ReminderType } from '@/@types';

import { Reminder, ReminderEdit } from './components';

type Props = {
  reminders: ReminderType[];
  isLoading: boolean;
  errorMessage: string | null;
  isEditing: boolean;
  lastTouchedReminderId: string | null;
};

const props = defineProps<Props>();

watch(
  [() => props.lastTouchedReminderId, () => props.reminders],
  ([id]) => {
    if (!id) {
      return;
    }

    nextTick(() => {
      setTimeout(() => {
        document.querySelector(`#reminder-${id}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300); // animation time
    });
  },
);
</script>

<template>
  <div class="Reminders FullWidth">
    <div v-if="isLoading">
      Loading...
    </div>

    <div v-if="errorMessage">
      Ошибка: {{ errorMessage }}
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="!isEditing" class="RemindersWrapper">
        <div
          v-for="reminderCur in reminders"
          :id="`reminder-${reminderCur.id}`"
          :key="reminderCur.id"
          class="FullWidth"
        >
          <Reminder :key="reminderCur.id" :reminder="reminderCur" />
        </div>
      </div>

      <ReminderEdit v-else class="FullWidth" />
    </Transition>
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
  gap: 16px;
  width: 100%;
}

.FullWidth {
  width: 100%;
}

.fade-enter-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-leave-active {
  transition: opacity 0.12s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
