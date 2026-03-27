<script setup lang="ts">
import { computed, nextTick, watch } from 'vue';
import { storeToRefs } from 'pinia';

import {
  type ProcedureCard as ProcedureCardType,
  useProcedureCardsStore,
} from '@/stores/procedureCardsStore.ts';

import { formatDate } from '@/utils';

import { ProcedureCard, ProcedureCardEdit } from './components';

const procedureCardStore = useProcedureCardsStore();
const { cards, draftCard, lastTouchedCardId } = storeToRefs(procedureCardStore);

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

const getCardInfo = (card: ProcedureCardType) => {
  const date = formatDate(card.date);

  const meta = `${date} - ${card.place} - ${card.duration};`
  const price = card.price ? `${card.price} Р` : '0 Р';

  return {
    meta,
    price,
  }
};
</script>

<template>
  <div class="FullWidth">
    <div v-if="!isEditing" class="ProcedureCardsWrapper">
      <div
        v-for="cardCur in cards"
        :key="cardCur.id"
        :ref="(el) => setCardRef(cardCur.id, el as HTMLElement)" class="FullWidth">
        <ProcedureCard
          :cardId="cardCur.id"
          :title="cardCur.procedureName"
          :meta="getCardInfo(cardCur).meta"
          :price="getCardInfo(cardCur).price"
          :notes="cardCur.notes"
        />
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
