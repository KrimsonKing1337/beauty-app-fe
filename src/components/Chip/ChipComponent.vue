<script setup lang="ts">
const props = defineProps<{
  isActive?: boolean;
}>();
</script>

<template>
  <div class="Chip" :class="{ isActive: props.isActive }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  .Chip {
    display: inline-flex;
    align-items: center;
    min-height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    background: var(--surface-muted);
    color: var(--text-secondary);
    font-size: var(--fs-caption);
    border: 1px solid transparent;

    &.isActive {
      display: inline-flex;
      align-items: center;
      min-height: 32px;
      padding: 0 12px;
      border-radius: 999px;
      background: var(--surface-muted);
      color: var(--text-secondary);
      font-size: var(--fs-caption);
      border: 1px solid transparent;
    }
  }
</style>
