<script setup lang="ts">
import { nextTick, watch } from 'vue';

import type { Procedure } from '@/@types';

import { ProcedureCard, ProcedureCardEdit } from './components';

type Props = {
  cards: Procedure[];
  isLoading: boolean;
  errorMessage: string | null;
  isEditing: boolean;
  lastTouchedCardId: string | null;
};

const props = defineProps<Props>();

const cardRefs = new Map<string, HTMLElement>();

const setCardRef = (id: string, el: HTMLElement | null) => {
  if (el) {
    cardRefs.set(id, el);
    return;
  }

  cardRefs.delete(id);
};

watch(
  () => props.lastTouchedCardId,
  (id) => {
    if (!id) {
      return;
    }

    nextTick(() => {
      cardRefs.get(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  },
);
</script>

<template>
  <div class="FullWidth">
    <div v-if="isLoading">
      Loading...
    </div>

    <div v-if="errorMessage">
      Ошибка: {{ errorMessage }}
    </div>

    <div v-if="!isEditing" class="ProcedureCardsWrapper">
      <div
        v-for="cardCur in cards"
        :key="cardCur.id"
        :ref="(el) => setCardRef(cardCur.id, el as HTMLElement)"
        class="FullWidth"
      >
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
