<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { type ProcedureCard as ProcedureCardType, useProcedureCardStore } from '@/stores/procedureCardStore';

import {
  PageHeader,
  ProcedureCard,
  BottomNav,
  ProcedureCardEdit,
} from '@/components';

const procedureCardStore = useProcedureCardStore();
const { cards } = storeToRefs(procedureCardStore);

function getCardInfo(card: ProcedureCardType) {
  const meta = `${card.date} - ${card.place} - ${card.duration};`
  const price = card.price ? `${card.price} Р` : '0 Р';

  return {
    meta,
    price,
  }
}
</script>

<template>
  <div class="MainPage">
    <div class="MainPageContent">
      <PageHeader />

      <div class="ProcedureCardsWrapper">
        <ProcedureCard
          v-for="cardCur in cards" :key="cardCur.id"
          :cardId="cardCur.id"
          :title="cardCur.procedureName"
          :meta="getCardInfo(cardCur).meta"
          :price="getCardInfo(cardCur).price"
          :notes="cardCur.notes"
        />

        <ProcedureCardEdit />
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
</style>
