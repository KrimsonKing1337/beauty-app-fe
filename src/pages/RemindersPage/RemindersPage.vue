<script setup lang="ts">
import { computed, watch } from 'vue';

import { useRoute } from 'vue-router';

import { storeToRefs } from 'pinia';

import type { Reminder as ReminderType } from '@/@types';

import { useRemindersStore } from '@/stores/remindersStore';

import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery';

import { CardPlaceholder } from '@/components';

import { Reminders } from './components';

const route = useRoute();

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

watch(
  () => route.query.scrollTo,
  (id) => {
    lastTouchedReminderId.value = typeof id === 'string' ? id : null;
  },
  { immediate: true },
);
</script>

<template>
  <CardPlaceholder v-if="showPlaceholder">
    Здесь будут напоминания
  </CardPlaceholder>

  <Reminders
    :reminders="reminders"
    :is-loading="isLoading"
    :error-message="errorMessage"
    :is-editing="isEditing"
    :last-touched-reminder-id="lastTouchedReminderId"
  />
</template>

<style scoped lang="scss">

</style>
