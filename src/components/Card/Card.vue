<script setup lang="ts">
const props = defineProps<{
  isSuccess?: boolean;
  isWarning?: boolean;
  isDanger?: boolean;
  isDisabled?: boolean;
}>();
</script>

<template>
  <div
    class="Card"
    :class="{
      isSuccess: props.isSuccess,
      isWarning: props.isWarning,
      isDanger: props.isDanger,
      isDisabled: props.isDisabled,
    }"
  >
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

  &.isSuccess {
    background-color: var(--success);
  }

  &.isWarning {
    background-color: var(--warning);
  }

  &.isDanger {
    background-color: var(--danger);
  }

  &.isDisabled {
    background-color: var(--surface-muted);
    color: var(--text-secondary);
  }
}
</style>
