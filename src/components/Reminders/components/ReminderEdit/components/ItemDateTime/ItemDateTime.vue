<script setup lang="ts">
import { type DatePickerState, Button, DatePicker, FloatLabel } from 'primevue';
import { ref } from 'vue';

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
      ref="calendarRef"
      v-model="model"
      id="input-date-time"
      dateFormat="dd.mm.yy"
      showTime
      fluid
      showButtonBar
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
