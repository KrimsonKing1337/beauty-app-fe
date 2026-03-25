<script setup lang="ts">
import { storeToRefs } from 'pinia';

import {
  Button,
  FloatLabel,
  DatePicker,
  FileUpload,
} from 'primevue';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';

import { Input } from '@/components';

const procedureCardsStore = useProcedureCardsStore();
const { draftCard } = storeToRefs(procedureCardsStore);

const saveButtonClickHandler = () => {
  procedureCardsStore.saveDraft();
};

const cancelButtonClickHandler = () => {
  procedureCardsStore.cancelEdit();
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

    <FloatLabel class="ProcedureCardEditItem isDatepicker">
      <label for="input-date">
        Дата
      </label>

      <DatePicker id="input-date" placeholder="Дата" v-model="draftCard!.date" />
    </FloatLabel>

    <Input
      v-model="draftCard!.place"
      id="input-place"
      class="ProcedureCardEditItem"
    >
      Название процедуры
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
        uploadLabel="Загрузить"
        cancelLabel="Отменить"
      />
    </div>

    <div class="ProcedureCardEditItem">
      <FileUpload
        accept="image/*"
        chooseLabel="Фото после"
        uploadLabel="Загрузить"
        cancelLabel="Отменить"
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

  &.isDatepicker {
    span {
      width: 100%;
    }
  }
}

.BottomNav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: var(--space-32);
}
</style>
