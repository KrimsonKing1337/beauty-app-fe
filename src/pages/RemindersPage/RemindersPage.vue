<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import type { Reminder as ReminderType } from '@/@types';

import { useRemindersStore } from '@/stores/remindersStore';

import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery';

import { CardPlaceholder } from '@/components';

import { Reminders } from './components';

const remindersStore = useRemindersStore();

const { draftReminder, lastTouchedReminderId } = storeToRefs(remindersStore);

const isEditing = computed(() => draftReminder.value !== null);

const {
  data,
  isLoading,
  isError,
  error,
} = useRemindersQuery();

const reminders = computed<ReminderType[]>(() => data.value ?? []);

const errorMessage = computed<string | null>(() => {
  if (!isError.value) {
    return null;
  }

  return error.value?.message ?? 'Неизвестная ошибка';
});

const showPlaceholder = computed(() => {
  return !reminders.value.length && !isEditing.value;
});
</script>

<template>
  <CardPlaceholder v-if="showPlaceholder">
    Здесь будут напоминания
  </CardPlaceholder>

  <Reminders
    :reminders="reminders"
    :isLoading="isLoading"
    :errorMessage="errorMessage"
    :isEditing="isEditing"
    :lastTouchedReminderId="lastTouchedReminderId"
  />
</template>

<style scoped lang="scss">

</style>
