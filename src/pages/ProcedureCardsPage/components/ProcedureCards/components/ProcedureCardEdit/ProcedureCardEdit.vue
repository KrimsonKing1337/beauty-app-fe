<script setup lang="ts">
import { ref } from 'vue';

import { storeToRefs } from 'pinia';

import { useQueryClient } from '@tanstack/vue-query';

import type { ProcedureDraft, ProcedureTypeModel } from '@/@types';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';

import { useSaveProcedureMutation } from '@/composables/mutations/procedures/useSaveProcedureMutation';

import {
  useCreateProcedureTypeMutation,
} from '@/composables/mutations/proceduresTypes/useCreateProcedureTypeMutation';

import { CardActions } from '@/components';

import type { ImageFiles } from './@types';

import { Form, UploadImages, ProcedureTypeSelect, ProcedureTagsSelect } from './components';

import { saveButtonClickHandler } from './utils';

const queryClient = useQueryClient();

const procedureCardsStore = useProcedureCardsStore();

const saveProcedureMutation = useSaveProcedureMutation();
const createProcedureTypeMutation = useCreateProcedureTypeMutation();

const { draftCard } = storeToRefs(procedureCardsStore);

const saveButtonIsLoadingRef = ref(false);

const procedureTypeModel = ref<ProcedureTypeModel>({
  typeValue: draftCard.value?.typeId ?? null,
  customTypeValue: '',
});

const imageFilesRef = ref<ImageFiles>({
  before: null,
  after: null,
});

const resetImageFiles = () => {
  imageFilesRef.value = {
    before: null,
    after: null,
  };
};

const invalidateCacheCallback = async () => {
  await queryClient.invalidateQueries({ queryKey: ['procedures'] });
};

const handleSaveClick = async () => {
  if (!procedureCardsStore.draftCard) {
    return;
  }

  saveButtonIsLoadingRef.value = true;

  try {
    if (procedureTypeModel.value.customTypeValue) {
      const newType = await createProcedureTypeMutation.mutateAsync({
        name: procedureTypeModel.value.customTypeValue,
      });

      procedureCardsStore.draftCard.typeId = newType.id;
    }

    procedureCardsStore.draftCard.typeId = procedureTypeModel.value.typeValue;

    await saveButtonClickHandler({
      store: procedureCardsStore,
      saveProcedureMutation,
      invalidateCacheCallback,
      files: imageFilesRef.value,
    });

    resetImageFiles();
  } finally {
    saveButtonIsLoadingRef.value = false;
  }
};

const handleCancelClick = () => {
  resetImageFiles();
  procedureCardsStore.cancelEdit();
};

const updateDraftCard = <K extends keyof NonNullable<ProcedureDraft>>(
  key: K,
  value: NonNullable<ProcedureDraft>[K],
) => {
  if (!procedureCardsStore.draftCard) {
    return;
  }

  procedureCardsStore.draftCard[key] = value;
};
</script>

<template>
  <div v-if="draftCard" class="ProcedureCardEdit">
    <div class="Item">
      <Form
        :draft-card="draftCard"
        @update:procedure-name="updateDraftCard('procedureName', $event)"
        @update:date="updateDraftCard('date', $event)"
        @update:place="updateDraftCard('place', $event)"
        @update:duration-hours="updateDraftCard('durationHours', $event)"
        @update:duration-minutes="updateDraftCard('durationMinutes', $event)"
        @update:price="updateDraftCard('price', $event)"
        @update:notes="updateDraftCard('notes', $event)"
      />

      <ProcedureTypeSelect v-model="procedureTypeModel" />
      <ProcedureTagsSelect />

      <UploadImages
        :before-file="imageFilesRef.before"
        :after-file="imageFilesRef.after"
        @update:before-file="imageFilesRef.before = $event"
        @update:after-file="imageFilesRef.after = $event"
      />

      <CardActions
        :is-loading="saveButtonIsLoadingRef"
        @save="handleSaveClick"
        @cancel="handleCancelClick"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ProcedureCardEdit {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(43, 24, 31, 0.04);

  @media (max-width: 400px) {
    padding: 16px 8px;
    border-radius: 16px;
  }
}

.Item {
  margin-top: 32px;

  @media (max-width: 400px) {
    &:first-child {
      margin-top: 8px;
    }
  }
}
</style>
