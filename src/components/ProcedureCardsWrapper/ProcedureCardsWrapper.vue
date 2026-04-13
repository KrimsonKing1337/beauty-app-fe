<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import type { ProcedureDto } from '@/api/procedures';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore';
import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery';

import { ProcedureCards } from '@/components/ProcedureCards';

const procedureCardStore = useProcedureCardsStore();
const { draftCard, lastTouchedCardId } = storeToRefs(procedureCardStore);

const isEditing = computed(() => draftCard.value !== null);

const {
  data,
  isLoading,
  isError,
  error,
} = useProceduresQuery();

const cards = computed<ProcedureDto[]>(() => data.value ?? []);

const errorMessage = computed<string | null>(() => {
  if (!isError.value) {
    return null;
  }

  return error.value?.message ?? 'Неизвестная ошибка';
});
</script>

<template>
  <ProcedureCards
    :cards="cards"
    :isLoading="isLoading"
    :errorMessage="errorMessage"
    :isEditing="isEditing"
    :lastTouchedCardId="lastTouchedCardId"
  />
</template>

<style scoped lang="scss">

</style>
