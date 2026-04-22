<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'save'): void;
  (e: 'cancel'): void;
}>();
</script>

<template>
  <div class="BottomNav">
    <VBtn
      class="Button"
      color="pink-lighten-3"
      rounded="lg"
      :loading="isLoading"
      @click="emit('save')"
    >
      Сохранить
    </VBtn>

    <VBtn
      class="Button isSecondary"
      rounded="lg"
      color="pink-lighten-5"
      @click="emit('cancel')"
    >
      Отменить
    </VBtn>
  </div>
</template>

<style scoped lang="scss">
.BottomNav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: var(--space-32);
}

.Button {
  color: #fff;

  &.isSecondary {
    color: #111;
  }
}
</style>
