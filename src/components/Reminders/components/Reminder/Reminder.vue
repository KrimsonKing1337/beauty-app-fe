<script setup lang="ts">
import { computed } from 'vue';

import type { Reminder } from '@/stores/remindersStore.ts';

import { Card } from '@/components';
import {
  formatReminderDate,
  getHumanReadableRepeatPreset,
  normalizedToPreset
} from '@/components/Reminders/utils';

import { Header } from './components';

const props = defineProps<{
  reminder: Reminder;
}>();

const formattedDate = computed(() => {
  return formatReminderDate(props.reminder.dateTime);
});

const leftTop = computed(() => {
  const preset = normalizedToPreset(props.reminder.repeat);
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
  <Card
    :isDisabled="reminder.isCompleted"
    :isDanger="formattedDate.isPast"
  >
    <Header
      :reminder="reminder"
      :leftTop="leftTop"
      :leftBottom="leftBottom"
      :rightTop="rightTop"
      :rightBottom="rightBottom"
    />
  </Card>
</template>

<style scoped lang="scss">

</style>
