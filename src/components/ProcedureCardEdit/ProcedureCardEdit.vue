<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Button } from 'primevue';

import {
  InputText,
  FloatLabel,
  DatePicker,
  FileUpload,
} from 'primevue';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';

const procedureCardsStore = useProcedureCardsStore();
const { draftCard } = storeToRefs(procedureCardsStore);
</script>

<template v-if="!!draftCard">
  <div class="ProcedureCardEdit">
    <FloatLabel class="ProcedureCardEditItem">
      <label for="input-title">
        Название процедуры
      </label>

      <InputText id="input-title" v-model="draftCard!.procedureName" />
    </FloatLabel>

    <FloatLabel class="ProcedureCardEditItem">
      <label for="input-date">
        Дата
      </label>

      <DatePicker id="input-date" placeholder="Дата" v-model="draftCard!.date" />
    </FloatLabel>


    <FloatLabel class="ProcedureCardEditItem">
      <label for="input-place">
        Место проведения
      </label>

      <InputText id="input-place" v-model="draftCard!.place" />
    </FloatLabel>

    <FloatLabel class="ProcedureCardEditItem">
      <label for="input-duration">
        Длительность
      </label>

      <InputText id="input-duration" v-model="draftCard!.duration" />
    </FloatLabel>

    <FloatLabel class="ProcedureCardEditItem">
      <label for="input-note">
        Описание
      </label>

      <InputText id="input-note" v-model="draftCard!.notes" />
    </FloatLabel>

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
      <Button severity="success" @click="procedureCardsStore.saveDraft();">
        Сохранить
      </Button>

      <Button severity="secondary" @click="procedureCardsStore.cancelEdit();">
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
  width: 100%;
  margin-top: var(--space-32);

  span,
  input {
    width: 100%;
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
