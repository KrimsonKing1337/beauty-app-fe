<script setup lang="ts">
import { storeToRefs } from 'pinia';

import {
  type FileUploadSelectEvent,

  FileUpload,
  Button,
  FloatLabel,
  DatePicker,
} from 'primevue';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';

import {
  useSaveProcedureMutation,
} from '@/composables/mutations/procedures/useSaveProcedureMutation.ts';

import { Input } from '@/components';
import { ref } from 'vue';
import { uploadFile } from '@/api/uploads.ts';

const procedureCardsStore = useProcedureCardsStore();
const saveProcedureMutation = useSaveProcedureMutation();

const { draftCard } = storeToRefs(procedureCardsStore);

const imageBeforeFileUploadRef = ref();
const imageAfterFileUploadRef = ref();

const saveButtonClickHandler = async () => {
  if (!procedureCardsStore.draftCard) {
    return;
  }

  const draft = procedureCardsStore.draftCard;

  if (procedureCardsStore.editingCardId) {
    const saved = await saveProcedureMutation.mutateAsync({
      ...draft,
      id: procedureCardsStore.editingCardId,
    });

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

    if (imageBeforeFileUploadRef.value) {
      await uploadFile({
        file: imageBeforeFileUploadRef.value,
        procedureId: saved.id,
        type: 'before',
      });
    }

    if (imageAfterFileUploadRef.value) {
      await uploadFile({
        file: imageAfterFileUploadRef.value,
        procedureId: saved.id,
        type: 'after',
      });
    }
  }

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
      v-model="draftCard!.procedureName"
      id="input-title"
      class="ReminderEditItem"
    >
      Название процедуры
    </Input>

    <FloatLabel class="ProcedureCardEditItem">
      <label for="input-date">
        Дата
      </label>

      <DatePicker
        v-model="draftCard!.date"
        id="input-date"
        placeholder="Дата"
        dateFormat="dd.mm.yy"
        fluid
      />
    </FloatLabel>

    <Input
      v-model="draftCard!.place"
      id="input-place"
      class="ProcedureCardEditItem"
    >
      Место проведения
    </Input>

    <Input
      v-model="draftCard!.duration"
      id="input-duration"
      class="ProcedureCardEditItem"
    >
      Длительность
    </Input>

    <Input
      v-model="draftCard!.notes"
      id="input-note"
      class="ProcedureCardEditItem"
    >
      Описание
    </Input>

    <div class="ProcedureCardEditItem">
      <FileUpload
        accept="image/*"
        chooseLabel="Фото до"
        customUpload
        mode="basic"
        @select="imageBeforeUploadSelectHandler"
      />
    </div>

    <div class="ProcedureCardEditItem">
      <FileUpload
        accept="image/*"
        chooseLabel="Фото после"
        mode="basic"
        customUpload
        @select="imageAfterUploadSelectHandler"
      />
    </div>

    <div class="BottomNav">
      <Button severity="success" @click="saveButtonClickHandler">
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
