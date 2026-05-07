<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from 'vue';

import { useRoute } from 'vue-router';

import { storeToRefs } from 'pinia';

import type {
  Reminder as ReminderType,
  ReminderSortBy,
  ReminderSortOrder,
} from '@/@types';

import { useRemindersStore } from '@/stores/remindersStore';

import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery';

import { CardPlaceholder } from '@/components';

import FiltersToolbar from '@/components/FiltersToolbar/FiltersToolbar.vue';

import { Reminders } from './components';

type SortValue = 'dateAsc' | 'dateDesc' | 'nameAsc' | 'nameDesc';
type StatusValue = 'all' | 'active' | 'completed';

const route = useRoute();

const remindersStore = useRemindersStore();

const { draftReminder, lastTouchedReminderId } = storeToRefs(remindersStore);

const search = ref('');
const status = ref<StatusValue>('all');
const sort = ref<SortValue>('dateAsc');
const page = ref(1);
const limit = ref(20);
const loadedReminders = ref<ReminderType[]>([]);

const isEditing = computed(() => draftReminder.value !== null);

const sortParams = computed<{
  sortBy: ReminderSortBy;
  sortOrder: ReminderSortOrder;
}>(() => {
  switch (sort.value) {
    case 'dateDesc':
      return {
        sortBy: 'dateTime',
        sortOrder: 'desc',
      };

    case 'nameAsc':
      return {
        sortBy: 'name',
        sortOrder: 'asc',
      };

    case 'nameDesc':
      return {
        sortBy: 'name',
        sortOrder: 'desc',
      };

    case 'dateAsc':
    default:
      return {
        sortBy: 'dateTime',
        sortOrder: 'asc',
      };
  }
});

const isCompleted = computed<boolean | null>(() => {
  if (status.value === 'active') {
    return false;
  }

  if (status.value === 'completed') {
    return true;
  }

  return null;
});

const remindersQueryParams = computed(() => ({
  page: page.value,
  limit: limit.value,
  sortBy: sortParams.value.sortBy,
  sortOrder: sortParams.value.sortOrder,
  search: search.value.trim(),
  isCompleted: isCompleted.value,
  includeProcedureReminders: false,
}));

const {
  data,
  pagination,
  isLoading,
  isFetching,
  isError,
  error,
} = useRemindersQuery(remindersQueryParams);

const reminders = computed<ReminderType[]>(() => {
  return loadedReminders.value;
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

const limitOptions = [
  { title: '10 элементов', value: 10 },
  { title: '20 элементов', value: 20 },
  { title: '50 элементов', value: 50 },
  { title: '100 элементов', value: 100 },
];

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
  return !isLoading.value
    && !hasActiveFilters.value
    && !reminders.value.length
    && !isEditing.value;
});

const showFilteredPlaceholder = computed(() => {
  return !isLoading.value
    && hasActiveFilters.value
    && !reminders.value.length
    && !isEditing.value;
});

const total = computed(() => pagination.value.total);

const hasMore = computed(() => {
  return reminders.value.length < total.value;
});

const loadMoreText = computed(() => {
  if (isFetching.value) {
    return 'Загружаем...';
  }

  return `Загрузить ещё ${limit.value}`;
});

const resetLoadedReminders = () => {
  loadedReminders.value = [];
  page.value = 1;
};

const resetFilters = () => {
  search.value = '';
  status.value = 'all';
  sort.value = 'dateAsc';
  limit.value = 20;
  resetLoadedReminders();
};

const loadMore = () => {
  if (!hasMore.value || isFetching.value) {
    return;
  }

  page.value += 1;
};

watch(
  data,
  (items) => {
    if (!items) {
      return;
    }

    if (page.value === 1) {
      loadedReminders.value = items;

      return;
    }

    const existingIds = new Set(
      loadedReminders.value.map((reminderCur) => reminderCur.id),
    );

    loadedReminders.value = [
      ...loadedReminders.value,
      ...items.filter((reminderCur) => !existingIds.has(reminderCur.id)),
    ];
  },
  { immediate: true },
);

watch(
  () => [
    search.value,
    status.value,
    sort.value,
    limit.value,
  ],
  resetLoadedReminders,
);

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
    <FiltersToolbar
      :has-active-filters="hasActiveFilters"
      :disabled="isEditing"
      @reset="resetFilters"
    >
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

      <VSelect
        v-model="limit"
        :items="limitOptions"
        label="Подгружать по"
        density="compact"
        variant="outlined"
        hide-details
      />
    </FiltersToolbar>

    <CardPlaceholder v-if="showPlaceholder">
      Здесь будут напоминания
    </CardPlaceholder>

    <CardPlaceholder v-else-if="showFilteredPlaceholder">
      Ничего не найдено
    </CardPlaceholder>

    <Reminders
      :reminders="reminders"
      :is-loading="isLoading && !reminders.length"
      :error-message="errorMessage"
      :is-editing="isEditing"
      :last-touched-reminder-id="lastTouchedReminderId"
    />

    <div
      v-if="!isEditing && reminders.length"
      class="LoadMore"
    >
      <div class="LoadMoreInfo">
        Показано {{ reminders.length }} из {{ total }}
      </div>

      <VBtn
        v-if="hasMore"
        variant="tonal"
        :loading="isFetching"
        :disabled="isFetching"
        @click="loadMore"
      >
        {{ loadMoreText }}
      </VBtn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.RemindersPage {
  width: 100%;
}

.ToolbarRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.LoadMore {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
}

.LoadMoreInfo {
  color: var(--text-secondary);
  font-size: 13px;
}

@media (max-width: 520px) {
  .ToolbarRow {
    grid-template-columns: 1fr;
  }
}
</style>
