<script setup lang="ts">
import { computed } from 'vue';

import type { Reminder } from '@/@types';

import { Card } from '@/components';

import { Header } from './components';

import {
  formatReminderDate,
  getHumanReadableRepeatPreset,
} from '../../../Reminders/utils';

const props = defineProps<{
  reminder: Reminder;
}>();

const formattedDate = computed(() => {
  return formatReminderDate(props.reminder.dateTime);
});

const leftTop = computed(() => {
  const preset = props.reminder.repeat.preset;
  const humanReadablePreset = getHumanReadableRepeatPreset(preset);

  let label = props.reminder.name;

  if (humanReadablePreset) {
    label += ` (${humanReadablePreset})`;
  }

  return label;
});

const leftBottom = computed(() => props.reminder.description);
const rightTop = computed(() => formattedDate.value.main);

const rightBottom = computed(() => {
  if (props.reminder.isCompleted) {
    return 'Завершено';
  }

  return formattedDate.value.relative;
});
</script>

<template>
  <Card :is-disabled="reminder.isCompleted" :is-danger="formattedDate.isPast">
    <Header
      :reminder="reminder"
      :left-top="leftTop"
      :left-bottom="leftBottom"
      :right-top="rightTop"
      :right-bottom="rightBottom"
    />
  </Card>
</template>

<style scoped lang="scss">

</style>
