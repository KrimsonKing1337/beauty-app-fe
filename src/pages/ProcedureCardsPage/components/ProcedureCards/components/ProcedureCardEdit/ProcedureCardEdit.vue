<script setup lang="ts">
import { ref } from 'vue';

import { storeToRefs } from 'pinia';

import { uploadFile } from '@/api/uploads.ts';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';

import {
  useSaveProcedureMutation,
} from '@/composables/mutations/procedures/useSaveProcedureMutation.ts';


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
</script>

<template v-if="!!draftCard">
  <div class="ProcedureCardEditItem">
    <VTextField
      v-model="draftCard!.procedureName"
      label="Название процедуры"
      variant="outlined"
      bg-color="#fff"
      class="Input"
    />

    <VExpansionPanels class="DatePicker">
      <VExpansionPanel rounded="lg">
        <VExpansionPanelTitle>
          <VIcon icon="mdi-calendar" class="mr-2" />

          <span>
            Дата проведения
          </span>
        </VExpansionPanelTitle>

        <VExpansionPanelText>
          <VDatePicker
            v-model="draftCard!.date"
            label="Дата"
            variant="outlined"
            color="pink-lighten-4"
            width="100%"
            first-day-of-week="1"
            header-date-format="normalDateWithWeekday"
            hide-title
          />
        </VExpansionPanelText>
      </VExpansionPanel>
    </VExpansionPanels>

    <VTextField
      v-model="draftCard!.place"
      label="Место проведения"
      variant="outlined"
      bg-color="#fff"
      class="Input"
    />

    <VTextField
      v-model="draftCard!.duration"
      label="Длительность"
      variant="outlined"
      bg-color="#fff"
      class="Input"
    />

    <VTextField
      v-model="draftCard!.notes"
      label="Описание"
      variant="outlined"
      bg-color="#fff"
      class="Input"
    />

    <VFileInput
      v-model="imageBeforeFileUploadRef"
      accept="image/*"
      label="Фото до"
      clearable
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
    />

    <VFileInput
      v-model="imageAfterFileUploadRef"
      accept="image/*"
      label="Фото после"
      clearable
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
    />

    <div class="BottomNav">
      <VBtn
        class="Button"
        color="pink-lighten-3"
        rounded="lg"
        :loading="saveButtonIsLoadingRef"
        @click="saveButtonClickHandler"
      >
        Сохранить
      </VBtn>

      <VBtn
        class="Button isSecondary"
        rounded="lg"
        color="pink-lighten-5"
        @click="cancelButtonClickHandler"
      >
        Отменить
      </VBtn>
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

.Button {
  color: #fff;

  &.isSecondary {
    color: #111;
  }
}

.Input {
  &:deep(.v-field) {
    border-radius: 10px;
  }
}

.DatePicker {
  margin-bottom: 25px;

  &:deep(.v-input__details) {
    display: none;
  }
}
</style>
