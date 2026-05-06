<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useRoute } from 'vue-router';

import { storeToRefs } from 'pinia';

import type { Reminder as ReminderType } from '@/@types';

import { useRemindersStore } from '@/stores/remindersStore';

import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery';

import { CardPlaceholder } from '@/components';

import { Reminders } from './components';

type SortValue = 'dateAsc' | 'dateDesc' | 'nameAsc' | 'nameDesc';
type StatusValue = 'all' | 'active' | 'completed';

const route = useRoute();

const remindersStore = useRemindersStore();

const { draftReminder, lastTouchedReminderId } = storeToRefs(remindersStore);

const search = ref('');
const status = ref<StatusValue>('all');
const sort = ref<SortValue>('dateAsc');

const isEditing = computed(() => draftReminder.value !== null);

const {
  data,
  isLoading,
  isError,
  error,
} = useRemindersQuery();

const reminders = computed<ReminderType[]>(() => {
  return (data.value ?? []).filter((reminderCur) => !reminderCur.procedureId);
});

const statusOptions = [
  { title: 'Все', value: 'all' },
  { title: 'Активные', value: 'active' },
  { title: 'Завершённые', value: 'completed' },
];

const sortOptions = [
  { title: 'Ближайшие сначала', value: 'dateAsc' },
  { title: 'Дальние сначала', value: 'dateDesc' },
  { title: 'Название А → Я', value: 'nameAsc' },
  { title: 'Название Я → А', value: 'nameDesc' },
];

const filteredReminders = computed<ReminderType[]>(() => {
  const normalizedSearch = search.value.trim().toLowerCase();

  const filtered = reminders.value.filter((reminderCur) => {
    const matchesSearch = !normalizedSearch
      || reminderCur.name.toLowerCase().includes(normalizedSearch)
      || reminderCur.description.toLowerCase().includes(normalizedSearch);

    const matchesStatus = status.value === 'all'
      || (status.value === 'active' && !reminderCur.isCompleted)
      || (status.value === 'completed' && reminderCur.isCompleted);

    return matchesSearch && matchesStatus;
  });

  return [...filtered].sort((a, b) => {
    switch (sort.value) {
      case 'dateDesc':
        return b.dateTime.getTime() - a.dateTime.getTime();

      case 'nameAsc':
        return a.name.localeCompare(b.name, 'ru');

      case 'nameDesc':
        return b.name.localeCompare(a.name, 'ru');

      case 'dateAsc':
      default:
        return a.dateTime.getTime() - b.dateTime.getTime();
    }
  });
});

const errorMessage = computed<string | null>(() => {
  if (!isError.value) {
    return null;
  }

  return error.value?.message ?? 'Неизвестная ошибка';
});

const hasActiveFilters = computed(() => {
  return Boolean(search.value.trim() || status.value !== 'all');
});

const showPlaceholder = computed(() => {
  return !reminders.value.length && !isEditing.value;
});

const showFilteredPlaceholder = computed(() => {
  return reminders.value.length > 0
    && !filteredReminders.value.length
    && !isEditing.value;
});

const resetFilters = () => {
  search.value = '';
  status.value = 'all';
  sort.value = 'dateAsc';
};

watch(
  () => route.query.scrollTo,
  (id) => {
    lastTouchedReminderId.value = typeof id === 'string' ? id : null;
  },
  { immediate: true },
);
</script>

<template>
  <div class="RemindersPage">
    <div v-if="!isEditing" class="Toolbar">
      <VTextField
        v-model="search"
        label="Поиск"
        placeholder="Название или описание"
        density="compact"
        variant="outlined"
        hide-details
        clearable
      />

      <div class="ToolbarRow">
        <VSelect
          v-model="status"
          :items="statusOptions"
          label="Статус"
          density="compact"
          variant="outlined"
          hide-details
        />

        <VSelect
          v-model="sort"
          :items="sortOptions"
          label="Сортировка"
          density="compact"
          variant="outlined"
          hide-details
        />
      </div>

      <VBtn
        v-if="hasActiveFilters"
        variant="text"
        color="pink-lighten-3"
        class="ResetButton"
        @click="resetFilters"
      >
        Сбросить фильтры
      </VBtn>
    </div>

    <CardPlaceholder v-if="showPlaceholder">
      Здесь будут напоминания
    </CardPlaceholder>

    <CardPlaceholder v-else-if="showFilteredPlaceholder">
      Ничего не найдено
    </CardPlaceholder>

    <Reminders
      :reminders="filteredReminders"
      :is-loading="isLoading"
      :error-message="errorMessage"
      :is-editing="isEditing"
      :last-touched-reminder-id="lastTouchedReminderId"
    />
  </div>
</template>

<style scoped lang="scss">
.RemindersPage {
  width: 100%;
}

.Toolbar {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(248, 246, 247, 0.92);
  border: 1px solid var(--border);
  border-radius: 20px;
  backdrop-filter: blur(14px);
}

.ToolbarRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.ResetButton {
  align-self: flex-start;
  min-height: 32px;
  padding: 0 8px;
}

@media (max-width: 520px) {
  .ToolbarRow {
    grid-template-columns: 1fr;
  }
}
</style>
