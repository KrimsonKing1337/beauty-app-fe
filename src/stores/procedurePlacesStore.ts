import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { ProcedurePlaceModel } from '@/@types';

export const useProcedurePlacesStore = defineStore('procedurePlaces', () => {
  const procedurePlaceModel = ref<ProcedurePlaceModel>({
    placeValue: null,
  });

  const procedurePlaceName = ref('');

  const setProcedurePlaceModel = (procedurePlaceModelNext: ProcedurePlaceModel) => {
    procedurePlaceModel.value = procedurePlaceModelNext;
  };

  const setProcedurePlaceName = (name: string) => {
    procedurePlaceName.value = name;
  };

  return {
    procedurePlaceModel,
    procedurePlaceName,
    setProcedurePlaceModel,
    setProcedurePlaceName,
  };
});
