<script setup lang="ts">
import { computed } from 'vue';
import { InputText, FloatLabel } from 'primevue';

const model = defineModel<string>();

const props = withDefaults(defineProps<{
  id: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
});

const inputType = computed(() => props.type);
</script>

<template>
  <FloatLabel variant="on" class="FloatLabel">
    <label :for="props.id">
      <slot />
    </label>

    <InputText
      :id="props.id"
      v-model="model"
      :type="inputType"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
    />
  </FloatLabel>
</template>

<style scoped lang="scss">
.FloatLabel {
  width: 100%;

  span,
  input {
    width: 100%;
  }
}
</style>
