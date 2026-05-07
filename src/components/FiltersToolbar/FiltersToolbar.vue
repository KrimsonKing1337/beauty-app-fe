<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  hasActiveFilters: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'reset'): void;
}>();

const isOpened = ref(false);

const buttonText = computed(() => {
  if (isOpened.value) {
    return 'Скрыть фильтры';
  }

  if (props.hasActiveFilters) {
    return 'Фильтры применены';
  }

  return 'Фильтры и сортировка';
});

const buttonIcon = computed(() => {
  return isOpened.value ? 'mdi-chevron-up' : 'mdi-tune';
});

const toggleButtonClickHandler = () => {
  isOpened.value = !isOpened.value;
};
</script>

<template>
  <div v-if="!disabled" class="FiltersToolbar">
    <div class="ToolbarToggle">
      <VBtn
        variant="tonal"
        color="pink-lighten-3"
        :prepend-icon="buttonIcon"
        @click="toggleButtonClickHandler"
      >
        {{ buttonText }}
      </VBtn>

      <VBtn
        v-if="hasActiveFilters"
        variant="text"
        color="pink-lighten-3"
        @click="emit('reset')"
      >
        Сбросить
      </VBtn>
    </div>

    <Transition name="toolbar">
      <div v-if="isOpened" class="ToolbarContent">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.FiltersToolbar {
  width: 100%;
}

.ToolbarToggle {
  position: sticky;
  top: 0;
  z-index: 6;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
  padding: 8px 0;
  background: var(--background);
}

.ToolbarContent {
  position: sticky;
  top: 56px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(248, 246, 247, 0.92);
  border: 1px solid var(--border);
  border-radius: 20px;
  backdrop-filter: blur(14px);
}

.toolbar-enter-active,
.toolbar-leave-active {
  overflow: hidden;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    max-height 0.18s ease;
}

.toolbar-enter-from,
.toolbar-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}

.toolbar-enter-to,
.toolbar-leave-from {
  max-height: 360px;
  opacity: 1;
  transform: translateY(0);
}
</style>
