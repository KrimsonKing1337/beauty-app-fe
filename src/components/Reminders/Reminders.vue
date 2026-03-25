<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRemindersStore } from '@/stores/remindersStore';

import { Reminder } from './components';

const remindersStore = useRemindersStore();
const { reminders } = storeToRefs(remindersStore);
</script>

<template>
  <div class="RemindersWrapper">
    <Reminder
      v-for="reminderCur in reminders"
      :key="reminderCur.id"
      :reminder="reminderCur"
    />
  </div>
</template>

<style scoped lang="scss">
.RemindersWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-16);
  width: 100%;
}
</style>
