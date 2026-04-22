<script setup lang="ts">
defineProps<{
  beforeFile: File | File[] | null;
  afterFile: File | File[] | null;
}>();

const emit = defineEmits<{
  (e: 'update:beforeFile', value: File | File[] | null): void;
  (e: 'update:afterFile', value: File | File[] | null): void;
}>();
</script>

<template>
  <div class="ProcedureCardEditImages">
    <VFileInput
      :model-value="beforeFile"
      accept="image/*"
      label="Фото до"
      clearable
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      @update:model-value="emit('update:beforeFile', $event)"
    />

    <VFileInput
      :model-value="afterFile"
      accept="image/*"
      label="Фото после"
      clearable
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      @update:model-value="emit('update:afterFile', $event)"
    />
  </div>
</template>
