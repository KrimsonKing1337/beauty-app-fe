<script setup lang="ts">
import { computed } from 'vue';

import { useProcedureTypesQuery } from '@/composables/queries/procedureTypes/useProcedureTypesQuery';

import {
  useDeleteProcedureTypeMutation,
} from '@/composables/mutations/proceduresTypes/useDeleteProcedureTypeMutation.ts';

import { getProcedureTypesOptions } from './utils';

type ProcedureTypeSelectModel = {
  typeValue: string | null;
  customTypeValue: string;
};

const model = defineModel<ProcedureTypeSelectModel>({
  required: true,
});

const { data: procedureTypes } = useProcedureTypesQuery();
const deleteProcedureTypeMutation = useDeleteProcedureTypeMutation();

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

const deleteButtonClickHandler = (id: string) => {
  deleteProcedureTypeMutation.mutateAsync(id);
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
    >
      <template #item="{ props: itemProps, item }">
        <VListItem v-bind="itemProps" class="SelectItem">
          <VBtn
            v-if="item.isCustom"
            icon="mdi-close"
            variant="text"
            title="Удалить тип"
            @click.capture.stop="deleteButtonClickHandler(item.value)"
          />
        </VListItem>
      </template>
    </VSelect>

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

<style scoped lang="scss">
.SelectItem {
  :deep(.v-list-item__content) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
