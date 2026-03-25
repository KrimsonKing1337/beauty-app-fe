<script setup lang="ts">
import { computed } from 'vue';
import type { Reminder } from '@/stores/remindersStore.ts';

import { Card } from '@/components';
import { formatReminderDate } from '@/components/Reminders/utils';

import { Header } from './components';

const props = defineProps<{
  reminder: Reminder;
}>();

const formattedDate = computed(() => {
  return formatReminderDate(props.reminder.dateTime);
});

const leftTop = computed(() => props.reminder.name);
const leftBottom = computed(() => props.reminder.description);
const rightTop = computed(() => formattedDate.value.main);
const rightBottom = computed(() => formattedDate.value.relative);
</script>

<template>
  <Card
    :isDisabled="reminder.isArchived"
    :isDanger="formattedDate.isPast"
  >
    <Header
      :id="reminder.id"
      :leftTop="leftTop"
      :leftBottom="leftBottom"
      :rightTop="rightTop"
      :rightBottom="rightBottom"
    />
  </Card>
</template>

<style scoped lang="scss">

</style>
