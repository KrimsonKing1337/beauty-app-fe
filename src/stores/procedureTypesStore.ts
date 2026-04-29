import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { ProcedureTypeModel } from '@/@types';

export const useProcedureTypesStore = defineStore('procedureTypes', () => {
  const procedureTypeModel = ref<ProcedureTypeModel>({
    typeValue: null,
    customTypeValue: '',
  });

  const procedureTypeName = ref('');

  const setProcedureTypeModel = (procedureTypeModelNext: ProcedureTypeModel) => {
    procedureTypeModel.value = procedureTypeModelNext;
  };

  const setProcedureTypeName = (name: string) => {
    procedureTypeName.value = name;
  };

  return {
    procedureTypeModel,
    procedureTypeName,
    setProcedureTypeModel,
    setProcedureTypeName,
  };
});
