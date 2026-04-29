<script setup lang="ts">
import { computed } from 'vue';

import { useProcedureTypesQuery } from '@/composables/queries/procedureTypes/useProcedureTypesQuery';

import { getProcedureTypesOptions } from './utils.ts';

defineProps<{
  typeValue: string | null;
  customTypeValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:typeValue', value: string | null): void;
  (e: 'update:customTypeValue', value: string): void;
}>();

const { data: procedureTypes } = useProcedureTypesQuery();

const procedureTypesOptions = computed(() => {
  return getProcedureTypesOptions(procedureTypes.value ?? []);
});
</script>

<template>
  <div class="ProcedureTypeSelect" :class="{ isActive: typeValue === 'custom' }">
    <VSelect
      :model-value="typeValue"
      :items="procedureTypesOptions"
      label="Тип процедуры"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      @update:model-value="emit('update:typeValue', $event)"
    />

    <VTextField
      v-if="typeValue === 'custom'"
      :model-value="customTypeValue"
      label="Название нового типа"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      @update:model-value="emit('update:customTypeValue', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.ProcedureTypeSelect {
  border: 0 transparent solid;
  border-radius: 12px;
  padding: 0;
  transition: border 0.2s, padding 0.2s;

  &.isActive {
    border: 1px #ccc solid;
    padding: 20px;
  }
}
</style>
