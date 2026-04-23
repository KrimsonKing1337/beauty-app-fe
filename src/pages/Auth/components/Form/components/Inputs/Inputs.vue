<script setup lang="ts">
type Props = {
  login: string;
  password: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:login', value?: string): void;
  (e: 'update:password', value?: string): void;
}>();
</script>

<template>
  <div class="Inputs">
    <VTextField
      :model-value="login"
      label="Логин"
      rounded="lg"
      variant="outlined"
      @update:model-value="value => emit('update:login', value)"
    />

    <VTextField
      :model-value="password"
      type="password"
      label="Пароль"
      rounded="lg"
      variant="outlined"
      @update:model-value="value => emit('update:password', value)"
    />
  </div>
</template>

<style scoped lang="scss">
.Inputs {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
