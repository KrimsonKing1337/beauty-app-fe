<script setup lang="ts">
import { ref } from 'vue';

import { storeToRefs } from 'pinia';

import type { ProcedureDraft } from '@/@types';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';

import { useSaveProcedureMutation } from '@/composables/mutations/procedures/useSaveProcedureMutation.ts';

import { CardActions } from '@/components';

import type { ImageFiles } from './@types';


import { Form, UploadImages } from './components';

import { saveButtonClickHandler } from './utils';

const procedureCardsStore = useProcedureCardsStore();
const saveProcedureMutation = useSaveProcedureMutation();

const { draftCard } = storeToRefs(procedureCardsStore);

const saveButtonIsLoadingRef = ref(false);

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

const handleSaveClick = async () => {
  if (!procedureCardsStore.draftCard) {
    return;
  }

  saveButtonIsLoadingRef.value = true;

  try {
    await saveButtonClickHandler({
      store: procedureCardsStore,
      saveProcedureMutation,
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
        @update:duration="updateDraftCard('duration', $event)"
        @update:notes="updateDraftCard('notes', $event)"
      />

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
}

.Item {
  margin-top: var(--space-32);
}
</style>
