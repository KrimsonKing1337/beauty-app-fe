<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost';
  nativeType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}>(), {
  variant: 'primary',
  nativeType: 'button',
  disabled: false,
});
</script>

<template>
  <button
    class="Button"
    :class="props.variant"
    :type="props.nativeType"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 18px;
  border: none;
  border-radius: 16px;
  font: inherit;
  font-weight: var(--fw-medium);
  color: #fff;
  background: var(--accent);
  box-shadow: 0 8px 20px rgba(217, 142, 161, 0.28);
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--accent-hover);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }

  &.secondary {
    color: var(--text-primary);
    background: var(--surface);
    border: 1px solid var(--border);
  }

  &.ghost {
    color: var(--accent);
    background: transparent;
    box-shadow: none;
  }
}
</style>
