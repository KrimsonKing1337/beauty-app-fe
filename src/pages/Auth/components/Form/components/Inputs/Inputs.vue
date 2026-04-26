<script setup lang="ts">
import { ref } from 'vue';

type Props = {
  login: string;
  password: string;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:login', value?: string): void;
  (e: 'update:password', value?: string): void;
}>();

const showPassword = ref(false);
</script>

<template>
  <div class="Inputs">
    <VTextField
      :model-value="login"
      label="Логин"
      rounded="lg"
      variant="outlined"
      hide-details
      @update:model-value="value => emit('update:login', value)"
    />

    <VTextField
      :model-value="password"
      :type="showPassword ? 'text' : 'password'"
      label="Пароль"
      rounded="lg"
      variant="outlined"
      hide-details
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="showPassword = !showPassword"
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
