<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();
</script>

<template>
  <VDialog :model-value="isOpen" max-width="500">
    <VCard
      prepend-icon="mdi-exclamation-thick"
      title="Точно удалить?"
      text="Это действие отменить нельзя"
    >
      <template #actions>
        <VSpacer></VSpacer>

        <VBtn @click="emit('close')">
          Не удалять
        </VBtn>

        <VBtn color="red" @click="emit('confirm');">
          Удалить
        </VBtn>
      </template>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">

</style>
