<script setup lang="ts">
const props = defineProps<{
  type?: 'primary' | 'secondary' | 'ghost';
}>();
</script>

<template>
  <button class="Button" :class="props.type">
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

  &:hover {
    background: var(--accent-hover);
  }

  &:active {
    transform: translateY(1px);
  }

  .secondary {
    color: var(--text-primary);
    background: var(--surface);
    border: 1px solid var(--border);
  }

  .ghost {
    color: var(--accent);
    background: transparent;
  }
}
</style>
