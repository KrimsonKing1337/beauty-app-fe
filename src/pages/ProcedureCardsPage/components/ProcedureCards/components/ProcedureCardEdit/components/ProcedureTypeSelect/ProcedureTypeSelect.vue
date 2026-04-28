<script setup lang="ts">
import { computed, ref } from 'vue';

import { useProcedureTypesQuery } from '@/composables/queries/procedureTypes/useProcedureTypesQuery.ts';

const { data: procedureTypes } = useProcedureTypesQuery();

const procedureTypesMapped = computed(() => {
  if (!procedureTypes.value) {
    return [];
  }

  return procedureTypes.value.map((procedureTypeCur) => {
    return {
      title: procedureTypeCur.name,
      value: procedureTypeCur.id,
    };
  });
});

const procedureTypesOptions = computed(() => {
  return [
    ...procedureTypesMapped.value,
    {
      title: 'Добавить свой',
      value: 0,
    },
  ];
});

const typeValue = ref(null);
const customTypeValue = ref('');
</script>

<template>
  <div class="ProcedureTypeSelect" :class="{ isActive: typeValue === 0 }">
    <VSelect
      v-model="typeValue"
      :items="procedureTypesOptions"
      label="Тип процедуры"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
    />

    <VTextField
      v-if="typeValue === 0"
      v-model="customTypeValue"
      label="Название нового типа"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
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
