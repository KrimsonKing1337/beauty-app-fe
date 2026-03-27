<script setup lang="ts">
import { computed, nextTick, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRemindersStore } from '@/stores/remindersStore';

import { Reminder, ReminderEdit } from './components';

const remindersStore = useRemindersStore();
const { remindersSorted, draftReminder, lastTouchedReminderId } = storeToRefs(remindersStore);

const isEditing = computed(() => draftReminder.value !== null);

const reminderRefs = new Map<string, HTMLElement>();

const setReminderRef = (id: string, el: HTMLElement | null) => {
  if (el) {
    reminderRefs.set(id, el);
  }
}

watch(lastTouchedReminderId, (id) => {
  if (!id) {
    return;
  }

  nextTick(() => {
    reminderRefs.get(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
</script>

<template>
  <div class="Reminders FullWidth">
    <div v-if="!isEditing" class="RemindersWrapper">
      <div
        v-for="reminderCur in remindersSorted"
        :key="reminderCur.id"
        :ref="(el) => setReminderRef(reminderCur.id, el as HTMLElement)"
        class="FullWidth"
      >
        <Reminder :reminder="reminderCur" />
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
