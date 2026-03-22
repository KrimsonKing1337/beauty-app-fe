<script setup lang="ts">
const props = defineProps<{
  isDisabled?: boolean;
}>();
</script>

<template>
  <div class="Card" :class="{ isDisabled: props.isDisabled }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  .Card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: var(--shadow);
    padding: 20px;

    &.isDisabled {
      background: var(--surface-muted);
      border: 1px solid transparent;
      border-radius: 20px;
      padding: 16px;
    }
  }
</style>
