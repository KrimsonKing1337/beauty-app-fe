<script setup lang="ts">
type Props = {
  rememberMe?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:rememberMe', value?: boolean): void;
}>();

const model = defineModel<boolean>();

</script>

<template>
  <label class="Checkbox">
    <input
      id="auth-remember-me"
      type="checkbox"
      :checked="model"
      @change="emit('update:rememberMe', ($event.target as HTMLInputElement).checked)"
    />
    <span>
      Запомнить меня
    </span>
  </label>
</template>

<style scoped lang="scss">
.Checkbox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;

  input {
    width: 16px;
    height: 16px;
    accent-color: var(--accent);
    cursor: pointer;
  }
}
</style>
