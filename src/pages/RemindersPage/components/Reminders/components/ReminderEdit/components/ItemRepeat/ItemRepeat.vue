<script setup lang="ts">
import { computed } from 'vue';

import type { RepeatPreset } from '@/@types';

type RepeatFormModel = {
  preset: RepeatPreset;
  daysOfWeek: number[];
  customInterval: number;
  customUnit: 'day' | 'week' | 'month' | 'year';
};

const options = [
  { title: 'Не повторять', value: 'none' },
  { title: 'Каждый день', value: 'daily' },
  { title: 'Каждую неделю', value: 'weekly' },
  { title: 'Дни недели', value: 'daysOfWeek' },
  { title: 'Каждый месяц', value: 'monthly' },
  { title: 'Каждый год', value: 'yearly' },
  { title: 'Другое', value: 'custom' },
];

const customUnitOptions = [
  { title: 'День', value: 'day' },
  { title: 'Неделя', value: 'week' },
  { title: 'Месяц', value: 'month' },
  { title: 'Год', value: 'year' },
];

const daysOfWeekOptions = [
  { title: 'Понедельник', value: 1 },
  { title: 'Вторник', value: 2 },
  { title: 'Среда', value: 3 },
  { title: 'Четверг', value: 4 },
  { title: 'Пятница', value: 5 },
  { title: 'Суббота', value: 6 },
  { title: 'Воскресенье', value: 7 },
];

const model = defineModel<RepeatFormModel>({ required: true });

const isActive = computed(() => {
  return model.value.preset === 'daysOfWeek' || model.value.preset === 'custom';
});

const safeCustomIntervalModel = computed({
  get: () => model.value.customInterval,
  set: (val: number | null | undefined) => {
    model.value.customInterval = !val ? 1 : val;
  },
});
</script>

<template>
  <div class="ReminderEditItemRepeat" :class="{ isActive }">
    <VSelect
      v-model="model.preset"
      :items="options"
      bg-color="#fff"
      variant="outlined"
      rounded="lg"
    />

    <div v-if="model.preset === 'daysOfWeek'">
      <div v-for="dayCur of daysOfWeekOptions" :key="dayCur.value">
        <VCheckbox
          v-model="model.daysOfWeek"
          :label="dayCur.title"
          :value="dayCur.value"
          color="pink-lighten-3"
          hide-details
        />
      </div>
    </div>

    <div v-if="model.preset === 'custom'" class="NumbersWrapper">
      <VSelect
        v-model="model.customUnit"
        :items="customUnitOptions"
        bg-color="#fff"
        variant="outlined"
        rounded="lg"
      />

      <VNumberInput
        v-model="safeCustomIntervalModel"
        :min="1"
        :max="999"
        bg-color="#fff"
        variant="outlined"
        rounded="lg"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ReminderEditItemRepeat {
  border: 0 transparent solid;
  border-radius: 12px;
  padding: 0;
  transition: border 0.2s, padding 0.2s;
  margin-top: 32px;

  &.isActive {
    border: 1px #ccc solid;
    padding: 20px;
  }
}

.NumbersWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
}
</style>
