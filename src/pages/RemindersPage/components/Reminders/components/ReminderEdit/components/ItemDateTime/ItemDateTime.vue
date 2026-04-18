<script setup lang="ts">
import { ref } from 'vue';

import { type DatePickerState, Button, DatePicker, FloatLabel } from 'primevue';

const model = defineModel<Date>({ required: true });

const calendarRef = ref<DatePickerState | null>(null);

const saveDateTimeButtonClickHandler = () => {
  if (calendarRef.value) {
    calendarRef.value.overlayVisible = false;
  }
};
</script>

<template>
  <FloatLabel class="ReminderEditItemDateTime" variant="on">
    <label for="input-date-time">
      Дата напоминания
    </label>

    <DatePicker
      id="input-date-time"
      ref="calendarRef"
      v-model="model"
      date-format="dd.mm.yy"
      show-time
      fluid
      show-button-bar
      placeholder="Дата напоминания"
    >
      <template #buttonbar>
        <div class="ButtonBar">
          <Button severity="success" @click="saveDateTimeButtonClickHandler">
            Закрыть
          </Button>
        </div>
      </template>
    </DatePicker>
  </FloatLabel>
</template>

<style scoped lang="scss">
.ReminderEditItemDateTime {
  margin-top: var(--space-32);

  label {
    z-index: 1;
  }
}
</style>
