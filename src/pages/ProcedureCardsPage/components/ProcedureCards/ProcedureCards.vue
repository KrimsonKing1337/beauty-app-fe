<script setup lang="ts">
import {
  type VNodeRef,
  computed,
  nextTick,
  ref,
  watch, watchEffect,
} from 'vue';

import { useVirtualizer } from '@tanstack/vue-virtual';

import type { Procedure, Reminder } from '@/@types';

import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery.ts';

import { AppError, Loader } from '@/components';

import { ProcedureCard, ProcedureCardEdit } from './components';

type Props = {
  cards: Procedure[];
  isLoading: boolean;
  errorMessage: string | null;
  isEditing: boolean;
  lastTouchedCardId: string | null;
};

const props = defineProps<Props>();

const { data: reminders } = useRemindersQuery({ isCompleted: false });

const remindersByProcedureId = computed(() => {
  if (!reminders.value) {
    return {};
  }

  console.log('reminders', reminders.value.filter((reminderCur) => reminderCur.procedureId));

  const entries = reminders.value
    .filter((reminderCur) => reminderCur.procedureId)
    .map((reminderCur) => [reminderCur.procedureId!, reminderCur]);

  console.log(entries);

  return Object.fromEntries(entries) as Record<string, Reminder>;
});

watchEffect(() => {
  // console.log('reminders', reminders.value);
});

const CARD_ESTIMATED_HEIGHT = 340;
const CARD_GAP = 16;

const cardsWrapperRef = ref<HTMLElement | null>(null);

const virtualizerOptions = computed(() => ({
  count: props.cards.length,
  getScrollElement: () => cardsWrapperRef.value,
  estimateSize: () => CARD_ESTIMATED_HEIGHT + CARD_GAP,
  overscan: 5,
  measureElement: (element: Element) => element.getBoundingClientRect().height,
}));

const virtualizer = useVirtualizer(virtualizerOptions);

const measureElement: VNodeRef = (element) => {
  if (!(element instanceof Element)) {
    return;
  }

  virtualizer.value.measureElement(element);
};

watch(
  () => props.lastTouchedCardId,
  (id) => {
    if (!id || props.isEditing) {
      return;
    }

    nextTick(() => {
      setTimeout(() => {
        const cardIndex = props.cards.findIndex((cardCur) => cardCur.id === id);

        if (cardIndex === -1) {
          return;
        }

        virtualizer.value.scrollToIndex(cardIndex, {
          align: 'start',
          behavior: 'smooth',
        });
      }, 300); // animation time
    });
  },
);
</script>

<template>
  <div class="ProcedureCards">
    <Loader v-if="isLoading" text="Загрузка процедур..." />

    <AppError
      v-if="errorMessage"
      title="Не удалось загрузить процедуры"
      :message="errorMessage"
      :with-retry="false"
    />

    <Transition name="fade" mode="out-in">
      <div v-if="!isEditing" ref="cardsWrapperRef" class="ProcedureCardsWrapper">
        <div
          class="ProcedureCardsVirtualInner"
          :style="{ height: `${virtualizer.getTotalSize()}px` }"
        >
          <div
            v-for="virtualRowCur in virtualizer.getVirtualItems()"
            :id="`card-${cards[virtualRowCur.index]!.id}`"
            :key="cards[virtualRowCur.index]!.id"
            :ref="measureElement"
            :data-index="virtualRowCur.index"
            class="ProcedureCardsVirtualItem"
            :style="{ transform: `translateY(${virtualRowCur.start}px)` }"
          >
            <ProcedureCard
              :card="cards[virtualRowCur.index]!"
              :reminder="remindersByProcedureId[cards[virtualRowCur.index]!.id]"
            />
          </div>
        </div>
      </div>

      <ProcedureCardEdit v-else class="FullWidth" />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.ProcedureCards {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  height: 100%;
  width: 100%;
  flex-grow: 1;
}

.ProcedureCardsWrapper {
  width: 100%;
}

.ProcedureCardsVirtualInner {
  position: relative;
  width: 100%;
}

.ProcedureCardsVirtualItem {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: 16px;
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
