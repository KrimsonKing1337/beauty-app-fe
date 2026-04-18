<script setup lang="ts">
import { FloatLabel, Select } from 'primevue';

const notificationMinutesBeforeOptions = [
  { label: '0 минут', value: 0 },
  { label: '5 минут', value: 5 },
  { label: '15 минут', value: 15 },
  { label: '30 минут', value: 30 },
  { label: '60 минут', value: 60 },
  { label: '2 часа', value: 120 },
  { label: '3 часа', value: 180 },
  { label: '4 часа', value: 240 },
];

const model = defineModel<number>({ required: true });
</script>

<template>
  <FloatLabel class="ReminderEditItemMinutesBefore">
    <label for="input-notifications-minutes-before">
      Напоминать за
    </label>

    <Select
      v-model="model"
      :options="notificationMinutesBeforeOptions"
      option-label="label"
      option-value="value"
      fluid
      input-id="input-notifications-minutes-before"
    />
  </FloatLabel>
</template>

<style scoped lang="scss">
.ReminderEditItemMinutesBefore {
  margin-top: var(--space-32);

  label {
    z-index: 1;
  }
}
</style>
