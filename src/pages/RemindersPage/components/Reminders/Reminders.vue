<script setup lang="ts">
import {
  type VNodeRef,
  computed,
  nextTick,
  ref,
  watch,
} from 'vue';

import { useVirtualizer } from '@tanstack/vue-virtual';

import type { Reminder as ReminderType } from '@/@types';

import { Reminder, ReminderEdit } from './components';

type Props = {
  reminders: ReminderType[];
  isLoading: boolean;
  errorMessage: string | null;
  isEditing: boolean;
  lastTouchedReminderId: string | null;
};

const props = defineProps<Props>();

const REMINDER_ESTIMATED_HEIGHT = 94;
const REMINDER_GAP = 16;

const remindersWrapperRef = ref<HTMLElement | null>(null);

const virtualizerOptions = computed(() => ({
  count: props.reminders.length,
  getScrollElement: () => remindersWrapperRef.value,
  estimateSize: () => REMINDER_ESTIMATED_HEIGHT + REMINDER_GAP,
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
  [() => props.lastTouchedReminderId, () => props.reminders],
  ([id]) => {
    if (!id) {
      return;
    }

    nextTick(() => {
      setTimeout(() => {
        document.querySelector(`#reminder-${id}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300); // animation time
    });
  },
);
</script>

<template>
  <div class="Reminders">
    <div v-if="isLoading">
      Loading...
    </div>

    <div v-if="errorMessage">
      Ошибка: {{ errorMessage }}
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="!isEditing" ref="remindersWrapperRef" class="RemindersWrapper">
        <div
          class="RemindersVirtualInner"
          :style="{ height: `${virtualizer.getTotalSize()}px` }"
        >
          <div
            v-for="virtualRowCur in virtualizer.getVirtualItems()"
            :id="`reminder-${reminders[virtualRowCur.index]!.id}`"
            :key="reminders[virtualRowCur.index]!.id"
            :ref="measureElement"
            :data-index="virtualRowCur.index"
            class="RemindersVirtualItem"
            :style="{ transform: `translateY(${virtualRowCur.start}px)` }"
          >
            <Reminder :reminder="reminders[virtualRowCur.index]!" />
          </div>
        </div>
      </div>

      <ReminderEdit v-else />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.Reminders {
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex-grow: 1;
}

.RemindersWrapper {
  width: 100%;
}

.RemindersVirtualInner {
  position: relative;
  width: 100%;
}

.RemindersVirtualItem {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: 16px;
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
