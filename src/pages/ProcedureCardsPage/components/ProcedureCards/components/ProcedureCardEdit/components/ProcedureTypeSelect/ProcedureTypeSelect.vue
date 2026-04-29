<script setup lang="ts">
import { computed } from 'vue';

import { useProcedureTypesQuery } from '@/composables/queries/procedureTypes/useProcedureTypesQuery';

import { getProcedureTypesOptions } from './utils.ts';

type ProcedureTypeSelectModel = {
  typeValue: string | null;
  customTypeValue: string;
};

const model = defineModel<ProcedureTypeSelectModel>({
  required: true,
});

const { data: procedureTypes } = useProcedureTypesQuery();

const procedureTypesOptions = computed(() => {
  return getProcedureTypesOptions(procedureTypes.value ?? []);
});

const updateTypeValue = (value: string | null) => {
  model.value = {
    ...model.value,
    typeValue: value,
  };
};

const updateCustomTypeValue = (value: string) => {
  model.value = {
    ...model.value,
    customTypeValue: value,
  };
};
</script>

<template>
  <div
    class="ProcedureTypeSelect"
    :class="{ isActive: model.typeValue === 'custom' }"
  >
    <VSelect
      :model-value="model.typeValue"
      :items="procedureTypesOptions"
      label="Тип процедуры"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      @update:model-value="updateTypeValue"
    />

    <VTextField
      v-if="model.typeValue === 'custom'"
      :model-value="model.customTypeValue"
      label="Название нового типа"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      @update:model-value="updateCustomTypeValue"
    />
  </div>
</template>
