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

</style>
