<script setup lang="ts">
import { InputText, FloatLabel } from 'primevue';

const model = defineModel<string>();

const props = defineProps<{
  id: string;
}>();
</script>

<template>
  <FloatLabel variant="on" class="InputFloatLabel">
    <label :for="props.id">
      <slot />
    </label>

    <InputText :id="props.id" v-model="model" />
  </FloatLabel>
</template>

<style scoped lang="scss">
.InputFloatLabel {
  width: 100%;

  span,
  input {
    width: 100%;
  }
}
</style>
