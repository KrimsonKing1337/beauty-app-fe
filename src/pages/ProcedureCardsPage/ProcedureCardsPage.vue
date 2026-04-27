<script setup lang="ts">
import { computed } from 'vue';

import { storeToRefs } from 'pinia';

import type { Procedure } from '@/@types';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore';

import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery';

import { CardPlaceholder } from '@/components';


import { ProcedureCards } from './components';

const procedureCardStore = useProcedureCardsStore();
const { draftCard, lastTouchedCardId } = storeToRefs(procedureCardStore);

const isEditing = computed(() => draftCard.value !== null);

const {
  data,
  isLoading,
  isError,
  error,
} = useProceduresQuery();

const cards = computed<Procedure[]>(() => {
  return data.value ?? [];
});

const errorMessage = computed<string | null>(() => {
  if (!isError.value) {
    return null;
  }

  return error.value?.message ?? 'Неизвестная ошибка';
});

const showPlaceholder = computed(() => {
  return !cards.value.length && !isEditing.value;
});
</script>

<template>
  <div class="ProcedureCardsPage">
    <CardPlaceholder v-if="showPlaceholder">
      Здесь будут процедуры
    </CardPlaceholder>

    <ProcedureCards
      :cards="cards"
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
</style>
