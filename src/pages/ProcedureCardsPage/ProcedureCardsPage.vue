<script setup lang="ts">
import { computed, ref } from 'vue';

import { storeToRefs } from 'pinia';

import type { Procedure } from '@/@types';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore';

import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery';
import { useProcedureTypesQuery } from '@/composables/queries/procedureTypes/useProcedureTypesQuery';
import { useTagsQuery } from '@/composables/queries/tags/useTagsQuery';

import { CardPlaceholder } from '@/components';

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

const isEditing = computed(() => draftCard.value !== null);

const {
  data,
  isLoading,
  isError,
  error,
} = useProceduresQuery();

const { data: procedureTypes } = useProcedureTypesQuery();
const { data: tags } = useTagsQuery();

const cards = computed<Procedure[]>(() => data.value ?? []);

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

const filteredCards = computed<Procedure[]>(() => {
  const normalizedSearch = search.value.trim().toLowerCase();

  const filtered = cards.value.filter((cardCur) => {
    const matchesSearch = !normalizedSearch
      || cardCur.procedureName.toLowerCase().includes(normalizedSearch)
      || cardCur.place?.toLowerCase().includes(normalizedSearch)
      || cardCur.notes?.toLowerCase().includes(normalizedSearch);

    const matchesType = !typeId.value || cardCur.typeId === typeId.value;

    const matchesTags = !tagIds.value.length
      || tagIds.value.every((tagIdCur) => cardCur.tagIds.includes(tagIdCur));

    return matchesSearch && matchesType && matchesTags;
  });

  return [...filtered].sort((a, b) => {
    switch (sort.value) {
      case 'dateAsc':
        return a.dateTime.getTime() - b.dateTime.getTime();

      case 'nameAsc':
        return a.procedureName.localeCompare(b.procedureName, 'ru');

      case 'nameDesc':
        return b.procedureName.localeCompare(a.procedureName, 'ru');

      case 'priceAsc':
        return (a.price ?? 0) - (b.price ?? 0);

      case 'priceDesc':
        return (b.price ?? 0) - (a.price ?? 0);

      case 'dateDesc':
      default:
        return b.dateTime.getTime() - a.dateTime.getTime();
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
  return Boolean(search.value.trim() || typeId.value || tagIds.value.length);
});

const showPlaceholder = computed(() => {
  return !cards.value.length && !isEditing.value;
});

const showFilteredPlaceholder = computed(() => {
  return cards.value.length > 0
    && !filteredCards.value.length
    && !isEditing.value;
});

const resetFilters = () => {
  search.value = '';
  typeId.value = null;
  tagIds.value = [];
  sort.value = 'dateDesc';
};
</script>

<template>
  <div class="ProcedureCardsPage">
    <div v-if="!isEditing" class="Toolbar">
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
      Здесь будут процедуры
    </CardPlaceholder>

    <CardPlaceholder v-else-if="showFilteredPlaceholder">
      Ничего не найдено
    </CardPlaceholder>

    <ProcedureCards
      :cards="filteredCards"
      :is-loading="isLoading"
      :error-message="errorMessage"
      :is-editing="isEditing"
      :last-touched-card-id="lastTouchedCardId"
    />
  </div>
</template>

<style scoped lang="scss">
.ProcedureCardsPage {
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
