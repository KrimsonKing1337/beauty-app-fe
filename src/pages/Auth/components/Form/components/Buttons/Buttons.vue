<script setup lang="ts">
import { Button } from 'primevue';

type Props = {
  isLoading: boolean;
  isSubmitDisabled: boolean;
}

defineProps<Props>();
</script>

<template>
  <Button
    class="Login"
    :loading="isLoading"
    label="Войти"
    type="submit"
    fluid
    :disabled="isSubmitDisabled"
  />

  <div class="Divider">
    <span>
      или
    </span>
  </div>

  <Button
    class="CreateAccount"
    label="Создать аккаунт"
    severity="secondary"
    variant="outlined"
    type="button"
    fluid
  />
</template>

<style scoped lang="scss">
.Divider {
  position: relative;
  text-align: center;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--border);
    transform: translateY(-50%);
  }

  span {
    position: relative;
    z-index: 1;
    display: inline-block;
    padding: 0 12px;
    font-size: 14px;
    color: var(--text-tertiary);
    background: rgba(255, 255, 255, 0.9);
  }
}
</style>
