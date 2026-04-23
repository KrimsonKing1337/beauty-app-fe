<script setup lang="ts">
type Props = {
  isLoading: boolean;
  isSubmitDisabled: boolean;
}

defineProps<Props>();
</script>

<template>
  <VBtn
    :loading="isLoading"
    :disabled="isSubmitDisabled"
    color="pink-lighten-3"
    rounded="lg"
    style="color: #fff"
    type="submit"
  >
    Войти
  </VBtn>

  <div class="Divider">
    <span>
      или
    </span>
  </div>

  <VBtn
    color="pink-lighten-5"
    rounded="lg"
    style="color: #000"
  >
    Создать аккаунт
  </VBtn>
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
