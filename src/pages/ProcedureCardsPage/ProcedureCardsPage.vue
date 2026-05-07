<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from 'vue';

import { storeToRefs } from 'pinia';

import type {
  Procedure,
  ProcedureSortBy,
  SortOrder,
} from '@/@types';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore';

import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery';
import { useProcedureTypesQuery } from '@/composables/queries/procedureTypes/useProcedureTypesQuery';
import { useTagsQuery } from '@/composables/queries/tags/useTagsQuery';

import { CardPlaceholder, FiltersToolbar } from '@/components';

import { ProcedureCards } from './components';

type SortValue = 'dateDesc'
  | 'dateAsc'
  | 'nameAsc'
  | 'nameDesc'
  | 'priceDesc'
  | 'priceAsc';

const procedureCardStore = useProcedureCardsStore();
const { draftCard, lastTouchedCardId } = storeToRefs(procedureCardStore);

const search = ref('');
const typeId = ref<string | null>(null);
const tagIds = ref<string[]>([]);
const sort = ref<SortValue>('dateDesc');
const page = ref(1);
const limit = ref(20);
const loadedCards = ref<Procedure[]>([]);

const isEditing = computed(() => draftCard.value !== null);

const sortParams = computed<{
  sortBy: ProcedureSortBy;
  sortOrder: SortOrder;
}>(() => {
  switch (sort.value) {
    case 'dateAsc':
      return {
        sortBy: 'dateTime',
        sortOrder: 'asc',
      };

    case 'nameAsc':
      return {
        sortBy: 'procedureName',
        sortOrder: 'asc',
      };

    case 'nameDesc':
      return {
        sortBy: 'procedureName',
        sortOrder: 'desc',
      };

    case 'priceAsc':
      return {
        sortBy: 'price',
        sortOrder: 'asc',
      };

    case 'priceDesc':
      return {
        sortBy: 'price',
        sortOrder: 'desc',
      };

    case 'dateDesc':
    default:
      return {
        sortBy: 'dateTime',
        sortOrder: 'desc',
      };
  }
});

const proceduresQueryParams = computed(() => ({
  page: page.value,
  limit: limit.value,
  sortBy: sortParams.value.sortBy,
  sortOrder: sortParams.value.sortOrder,
  search: search.value.trim(),
  typeId: typeId.value,
  tagIds: tagIds.value,
}));

const {
  data,
  pagination,
  isLoading,
  isFetching,
  isError,
  error,
} = useProceduresQuery(proceduresQueryParams);

const { data: procedureTypes } = useProcedureTypesQuery();
const { data: tags } = useTagsQuery();

const cards = computed<Procedure[]>(() => loadedCards.value);

const typeOptions = computed(() => {
  return [
    { title: 'Все типы', value: null },
    ...(procedureTypes.value ?? []).map((typeCur) => ({
      title: typeCur.name,
      value: typeCur.id,
    })),
  ];
});

const tagOptions = computed(() => {
  return (tags.value ?? []).map((tagCur) => ({
    title: tagCur.name,
    value: tagCur.id,
  }));
});

const sortOptions = [
  { title: 'Сначала новые', value: 'dateDesc' },
  { title: 'Сначала старые', value: 'dateAsc' },
  { title: 'Название А → Я', value: 'nameAsc' },
  { title: 'Название Я → А', value: 'nameDesc' },
  { title: 'Цена по убыванию', value: 'priceDesc' },
  { title: 'Цена по возрастанию', value: 'priceAsc' },
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
  return Boolean(search.value.trim() || typeId.value || tagIds.value.length);
});

const showPlaceholder = computed(() => {
  return !isLoading.value
    && !hasActiveFilters.value
    && !cards.value.length
    && !isEditing.value;
});

const showFilteredPlaceholder = computed(() => {
  return !isLoading.value
    && hasActiveFilters.value
    && !cards.value.length
    && !isEditing.value;
});

const total = computed(() => pagination.value.total);

const hasMore = computed(() => {
  return cards.value.length < total.value;
});

const loadMoreText = computed(() => {
  if (isFetching.value) {
    return 'Загружаем...';
  }

  return `Загрузить ещё ${limit.value}`;
});

const resetLoadedCards = () => {
  loadedCards.value = [];
  page.value = 1;
};

const resetFilters = () => {
  search.value = '';
  typeId.value = null;
  tagIds.value = [];
  sort.value = 'dateDesc';
  limit.value = 20;
  resetLoadedCards();
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
      loadedCards.value = items;

      return;
    }

    const existingIds = new Set(loadedCards.value.map((cardCur) => cardCur.id));

    loadedCards.value = [
      ...loadedCards.value,
      ...items.filter((cardCur) => !existingIds.has(cardCur.id)),
    ];
  },
  { immediate: true },
);

watch(
  () => [
    search.value,
    typeId.value,
    tagIds.value.join(','),
    sort.value,
    limit.value,
  ],
  resetLoadedCards,
);
</script>

<template>
  <div class="ProcedureCardsPage">
    <FiltersToolbar
      :has-active-filters="hasActiveFilters"
      :disabled="isEditing"
      @reset="resetFilters"
    >
      <VTextField
        v-model="search"
        label="Поиск"
        placeholder="Название, место, заметки"
        density="compact"
        variant="outlined"
        hide-details
        clearable
      />

      <div class="ToolbarRow">
        <VSelect
          v-model="typeId"
          :items="typeOptions"
          label="Тип"
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

      <div class="ToolbarRow">
        <VSelect
          v-model="tagIds"
          :items="tagOptions"
          label="Тэги"
          density="compact"
          variant="outlined"
          hide-details
          clearable
          multiple
          chips
        />

        <VSelect
          v-model="limit"
          :items="limitOptions"
          label="Подгружать по"
          density="compact"
          variant="outlined"
          hide-details
        />
      </div>
    </FiltersToolbar>

    <CardPlaceholder v-if="showPlaceholder">
      Здесь будут процедуры
    </CardPlaceholder>

    <CardPlaceholder v-else-if="showFilteredPlaceholder">
      Ничего не найдено
    </CardPlaceholder>

    <ProcedureCards
      :cards="cards"
      :is-loading="isLoading && !cards.length"
      :error-message="errorMessage"
      :is-editing="isEditing"
      :last-touched-card-id="lastTouchedCardId"
    />

    <div
      v-if="!isEditing && cards.length"
      class="LoadMore"
    >
      <div class="LoadMoreInfo">
        Показано {{ cards.length }} из {{ total }}
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
.ProcedureCardsPage {
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
