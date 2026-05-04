<script setup lang="ts">
import type { ReminderNotifications } from '@/@types';

const model = defineModel<ReminderNotifications>({ required: true });
</script>

<template>
  <div class="ReminderEditItemUnitsOfTimeBefore">
    <div class="Title">
      Напомнить за
    </div>

    <div class="InputsWrapper">
      <VNumberInput
        v-model="model.daysBefore"
        label="Дни"
        variant="outlined"
        bg-color="#fff"
        rounded="lg"
        :min="0"
        :max="999"
        hide-details
      />

      <VNumberInput
        v-model="model.hoursBefore"
        label="Часы"
        variant="outlined"
        bg-color="#fff"
        rounded="lg"
        :min="0"
        :max="23"
        hide-details
      />

      <VNumberInput
        v-model="model.minutesBefore"
        label="Минуты"
        variant="outlined"
        bg-color="#fff"
        rounded="lg"
        :min="0"
        :max="59"
        hide-details
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.InputsWrapper {
  display: flex;
  gap: 16px;
  border: 1px #ccc solid;
  border-radius: 12px;
  padding: 20px;
  transition: border 0.2s, padding 0.2s;
}

.Title {
  font-weight: bold;
}
</style>
