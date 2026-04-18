<script setup lang="ts">
import { computed } from 'vue';

import { FloatLabel, Select, Checkbox, InputNumber } from 'primevue';

import type { RepeatPreset } from '@/components/Reminders/@types';

type RepeatFormModel = {
  preset: RepeatPreset;
  daysOfWeek: number[];
  customInterval: number;
  customUnit: 'day' | 'week' | 'month' | 'year';
};

const options = [
  { label: 'Не повторять', value: 'none' },
  { label: 'Каждый день', value: 'daily' },
  { label: 'Каждую неделю', value: 'weekly' },
  { label: 'Дни недели', value: 'daysOfWeek' },
  { label: 'Каждый месяц', value: 'monthly' },
  { label: 'Каждый год', value: 'yearly' },
  { label: 'Другое', value: 'custom' },
];

const customUnitOptions = [
  { label: 'День', value: 'day' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
  { label: 'Год', value: 'year' },
];

const daysOfWeekOptions = [
  { label: 'Понедельник', value: 1 },
  { label: 'Вторник', value: 2 },
  { label: 'Среда', value: 3 },
  { label: 'Четверг', value: 4 },
  { label: 'Пятница', value: 5 },
  { label: 'Суббота', value: 6 },
  { label: 'Воскресенье', value: 7 },
];

const model = defineModel<RepeatFormModel>({ required: true });

const isActive = computed(() => {
  return model.value.preset === 'daysOfWeek' || model.value.preset === 'custom';
},
);
</script>

<template>
  <div class="ReminderEditItemRepeat" :class="{ isActive }">
    <FloatLabel variant="on">
      <label for="input-repeat">
        Повторять
      </label>

      <Select
        v-model="model.preset"
        :options="options"
        option-label="label"
        option-value="value"
        fluid
        input-id="input-repeat"
      />
    </FloatLabel>

    <div v-if="model.preset === 'daysOfWeek'" class="ReminderEditItemRepeatDaysOfWeek">
      <div
        v-for="dayCur of daysOfWeekOptions"
        :key="dayCur.value"
        class="ReminderEditItemRepeatDaysOfWeekItem"
      >
        <Checkbox
          v-model="model.daysOfWeek"
          :input-id="`input-repeat-days-of-week-${dayCur.value}`"
          name="category"
          :value="dayCur.value"
        />

        <label :for="`input-repeat-days-of-week-${dayCur.value}`">
          {{ dayCur.label }}
        </label>
      </div>
    </div>

    <div v-if="model.preset === 'custom'" class="ReminderEditItemNumbersWrapper">
      <FloatLabel variant="on">
        <label for="input-repeat-custom-unit">
          Единица времени
        </label>

        <Select
          v-model="model.customUnit"
          :options="customUnitOptions"
          option-label="label"
          option-value="value"
          fluid
          input-id="input-repeat-custom-unit"
        />
      </FloatLabel>

      <FloatLabel variant="on">
        <label for="input-repeat-custom-interval">
          Количество
        </label>

        <InputNumber
          v-model="model.customInterval"
          input-id="input-repeat-custom-interval"
          show-buttons
          :min="1"
          :max="999"
          :allow-empty="false"
        />
      </FloatLabel>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ReminderEditItemRepeat {
  border: 0 transparent solid;
  border-radius: 12px;
  padding: 0;
  transition: border 0.2s, padding 0.2s;
  margin-top: var(--space-32);

  &.isActive {
    border: 1px #ccc solid;
    padding: 20px;
  }

  label {
    z-index: 1;
  }
}

.ReminderEditItemNumbersWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: var(--space-24);
}

.ReminderEditItemNumber {
  width: 16.5%;

  &:global(.p-inputnumber),
  &:global(.p-inputtext) {
    width: 100%;
  }

  label {
    z-index: 1;
  }
}

.ReminderEditItemRepeatDaysOfWeek {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 20px;
}

.ReminderEditItemRepeatDaysOfWeekItem {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
}
</style>
