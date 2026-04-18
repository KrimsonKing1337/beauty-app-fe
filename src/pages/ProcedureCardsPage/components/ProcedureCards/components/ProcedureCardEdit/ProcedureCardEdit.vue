<script setup lang="ts">
import { ref } from 'vue';

import {
  type FileUploadSelectEvent,

  FileUpload,
  Button,
  FloatLabel,
  DatePicker,
} from 'primevue';

import { storeToRefs } from 'pinia';


import { uploadFile } from '@/api/uploads.ts';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';

import {
  useSaveProcedureMutation,
} from '@/composables/mutations/procedures/useSaveProcedureMutation.ts';

import { Input } from '@/components';





const procedureCardsStore = useProcedureCardsStore();
const saveProcedureMutation = useSaveProcedureMutation();

const { draftCard } = storeToRefs(procedureCardsStore);

const imageBeforeFileUploadRef = ref();
const imageAfterFileUploadRef = ref();

const saveButtonIsLoadingRef = ref(false);

const uploadImages = async (procedureId: string) => {
  if (imageBeforeFileUploadRef.value) {
    await uploadFile({
      file: imageBeforeFileUploadRef.value,
      procedureId: procedureId,
      type: 'before',
    });
  }

  if (imageAfterFileUploadRef.value) {
    await uploadFile({
      file: imageAfterFileUploadRef.value,
      procedureId: procedureId,
      type: 'after',
    });
  }
};

const saveButtonClickHandler = async () => {
  if (!procedureCardsStore.draftCard) {
    return;
  }

  saveButtonIsLoadingRef.value = true;

  const draft = procedureCardsStore.draftCard;

  if (procedureCardsStore.editingCardId) {
    const saved = await saveProcedureMutation.mutateAsync({
      ...draft,
      id: procedureCardsStore.editingCardId,
    });

    await uploadImages(procedureCardsStore.editingCardId);

    procedureCardsStore.setLastTouchedCardId(saved.id);
  } else {
    const payload = {
      procedureName: draft.procedureName,
      date: draft.date,
      place: draft.place,
      duration: draft.duration,
      price: draft.price,
      beforeAfter: draft.beforeAfter,
      beforeImagePaths: [],
      afterImagePaths: [],
      notes: draft.notes,
      updatedAt: new Date().toISOString(),
    };

    const saved = await saveProcedureMutation.mutateAsync(payload);

    procedureCardsStore.setLastTouchedCardId(saved.id);

    await uploadImages(saved.id);
  }

  saveButtonIsLoadingRef.value = false;

  procedureCardsStore.clearDraft();
};

const cancelButtonClickHandler = () => {
  imageBeforeFileUploadRef.value = null;
  imageAfterFileUploadRef.value = null;

  procedureCardsStore.cancelEdit();
};

const imageBeforeUploadSelectHandler = (event: FileUploadSelectEvent) => {
  imageBeforeFileUploadRef.value = event.files?.[0];
};

const imageAfterUploadSelectHandler = (event: FileUploadSelectEvent) => {
  imageAfterFileUploadRef.value = event.files?.[0];
};
</script>

<template v-if="!!draftCard">
  <div class="ProcedureCardEditItem">
    <Input
      id="input-title"
      v-model="draftCard!.procedureName"
      class="ReminderEditItem"
    >
      Название процедуры
    </Input>

    <FloatLabel class="ProcedureCardEditItem">
      <label for="input-date">
        Дата
      </label>

      <DatePicker
        id="input-date"
        v-model="draftCard!.date"
        placeholder="Дата"
        date-format="dd.mm.yy"
        fluid
      />
    </FloatLabel>

    <Input
      id="input-place"
      v-model="draftCard!.place"
      class="ProcedureCardEditItem"
    >
      Место проведения
    </Input>

    <Input
      id="input-duration"
      v-model="draftCard!.duration"
      class="ProcedureCardEditItem"
    >
      Длительность
    </Input>

    <Input
      id="input-note"
      v-model="draftCard!.notes"
      class="ProcedureCardEditItem"
    >
      Описание
    </Input>

    <div class="ProcedureCardEditItem">
      <FileUpload
        accept="image/*"
        choose-label="Фото до"
        custom-upload
        mode="basic"
        @select="imageBeforeUploadSelectHandler"
      />
    </div>

    <div class="ProcedureCardEditItem">
      <FileUpload
        accept="image/*"
        choose-label="Фото после"
        mode="basic"
        custom-upload
        @select="imageAfterUploadSelectHandler"
      />
    </div>

    <div class="BottomNav">
      <Button severity="success" :loading="saveButtonIsLoadingRef" @click="saveButtonClickHandler">
        Сохранить
      </Button>

      <Button severity="secondary" @click="cancelButtonClickHandler">
        Отменить
      </Button>
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

.ProcedureCardEditItem {
  margin-top: var(--space-32);
}

.BottomNav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: var(--space-32);
}
</style>
