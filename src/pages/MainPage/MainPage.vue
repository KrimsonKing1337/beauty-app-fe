<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { type ProcedureCard as ProcedureCardType, useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';

import {
  PageHeader,
  ProcedureCard,
  BottomNav,
  ProcedureCardEdit,
} from '@/components';

const procedureCardStore = useProcedureCardsStore();
const { cards } = storeToRefs(procedureCardStore);

const getCardInfo = (card: ProcedureCardType) => {
  const meta = `${card.date} - ${card.place} - ${card.duration};`
  const price = card.price ? `${card.price} Р` : '0 Р';
  const isEditing = procedureCardStore.editingCardId === card.id;

  return {
    meta,
    price,
    isEditing
  }
};
</script>

<template>
  <div class="MainPage">
    <div class="MainPageContent">
      <PageHeader />

      <div class="ProcedureCardsWrapper">
        <div v-for="cardCur in cards" :key="cardCur.id" class="ProcedureCardWrapper">
          <ProcedureCard
            v-if="!getCardInfo(cardCur).isEditing"
            :cardId="cardCur.id"
            :title="cardCur.procedureName"
            :meta="getCardInfo(cardCur).meta"
            :price="getCardInfo(cardCur).price"
            :notes="cardCur.notes"
          />

          <ProcedureCardEdit v-else />
        </div>
      </div>

      <BottomNav />
    </div>
  </div>
</template>

<style scoped lang="scss">
.MainPage {
  min-height: 100vh;
  padding: 20px;
  background: var(--bg);
}

.MainPageContent {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
}

.ProcedureCardsWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-16);
}

.ProcedureCardWrapper {
  width: 100%;
}
</style>
