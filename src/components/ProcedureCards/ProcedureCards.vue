<script setup lang="ts">
import { computed, nextTick, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore';

import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery';

import { ProcedureCard, ProcedureCardEdit } from './components';

const procedureCardStore = useProcedureCardsStore();
const { draftCard, lastTouchedCardId } = storeToRefs(procedureCardStore);

const isEditing = computed(() => draftCard.value !== null);

const cardRefs = new Map<string, HTMLElement>();

const setCardRef = (id: string, el: HTMLElement | null) => {
  if (el) {
    cardRefs.set(id, el);
  }
}

watch(lastTouchedCardId, (id) => {
  if (!id) {
    return;
  }

  nextTick(() => {
    cardRefs.get(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

const {
  data: cards,
  isLoading,
  isError,
  error,
} = useProceduresQuery();
</script>

<template>
  <div class="FullWidth">
    <div v-if="isLoading">
      Loading...
    </div>

    <div v-if="isError">
      Ошибка: {{ error?.message }}
    </div>

    <div v-if="!isEditing" class="ProcedureCardsWrapper">
      <div
        v-for="cardCur in cards"
        :key="cardCur.id"
        :ref="(el) => setCardRef(cardCur.id, el as HTMLElement)" class="FullWidth">
        <ProcedureCard :card="cardCur" />
      </div>
    </div>

    <ProcedureCardEdit v-if="isEditing" class="FullWidth" />
  </div>
</template>

<style scoped lang="scss">
.ProcedureCardsWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-16);
  width: 100%;
}

.FullWidth {
  width: 100%;
}
</style>
