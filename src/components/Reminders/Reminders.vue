<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Card } from '@/components';
import { useRemindersStore } from '@/stores/remindersStore';

const remindersStore = useRemindersStore();
const { reminders } = storeToRefs(remindersStore);
</script>

<template>
  <div class="RemindersWrapper">
    <Card v-for="reminderCur in reminders" :key="reminderCur.id">
      {{ reminderCur.name }}
    </Card>
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
