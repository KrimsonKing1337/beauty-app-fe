<script setup lang="ts">
const props = defineProps<{
  isArchived?: boolean;
  isCompleted?: boolean;
}>();
</script>

<template>
  <div
    class="Card"
    :class="{
      isArchived: props.isArchived,
      isCompleted: props.isCompleted,
     }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.Card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(43, 24, 31, 0.04);

  &.isCompleted {
    background-color: var(--success);
  }

  &.isArchived {
    background-color: var(--surface-muted);
  }
}
</style>
