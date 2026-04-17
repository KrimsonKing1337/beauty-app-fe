<script setup lang="ts">
import { Input } from '@/components';

type Props = {
  form: {
    login: string;
    password: string;
  };
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:login', value?: string): void;
  (e: 'update:password', value?: string): void;
}>();
</script>

<template>
  <div class="Inputs">
    <Input
      id="auth-email"
      :modelValue="form.login"
      @update:modelValue="value => emit('update:login', value)"
    >
      Логин
    </Input>

    <Input
      id="auth-password"
      type="password"
      :modelValue="form.password"
      @update:modelValue="value => emit('update:password', value)"
    >
      Пароль
    </Input>
  </div>
</template>

<style scoped lang="scss">
.Inputs {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
