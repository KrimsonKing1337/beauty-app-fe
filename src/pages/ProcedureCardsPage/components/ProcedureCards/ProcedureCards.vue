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

watch(
  () => props.lastTouchedCardId,
  (id) => {
    if (!id) {
      return;
    }

    nextTick(() => {
      setTimeout(() => {
        document.querySelector(`#card-${id}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300); // animation time
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

    <Transition name="fade" mode="out-in">
      <div v-if="!isEditing" class="ProcedureCardsWrapper">
        <div
          v-for="cardCur in cards"
          :id="`card-${cardCur.id}`"
          :key="cardCur.id"
          class="FullWidth"
        >
          <ProcedureCard :card="cardCur" />
        </div>
      </div>

      <ProcedureCardEdit v-else class="FullWidth" />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.ProcedureCardsWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
}

.FullWidth {
  width: 100%;
}

.fade-enter-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-leave-active {
  transition: opacity 0.12s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
