<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import {
  InputText,
  FloatLabel,
  DatePicker,
  FileUpload,
} from 'primevue';

import { useProcedureCardStore } from '@/stores/procedureCardStore';

const procedureCardsStore = useProcedureCardStore();
const { editingCard } = storeToRefs(procedureCardsStore);

const procedureName = computed({
  get: () => editingCard.value?.procedureName ?? '',
  set: (value: string) => {
    if (!editingCard.value) {
      return;
    }

    procedureCardsStore.updateCard(editingCard.value.id, {
      procedureName: value,
    });
  },
});

const date = computed({
  get: () => editingCard.value?.date ?? null,
  set: (value: Date | null) => {
    if (!editingCard.value) {
      return;
    }

    procedureCardsStore.updateCard(editingCard.value.id, {
      date: value,
    });
  },
});

const place = computed({
  get: () => editingCard.value?.place ?? '',
  set: (value: string) => {
    if (!editingCard.value) {
      return;
    }

    procedureCardsStore.updateCard(editingCard.value.id, {
      place: value,
    });
  },
});

const duration = computed({
  get: () => editingCard.value?.duration ?? '',
  set: (value: string) => {
    if (!editingCard.value) {
      return;
    }

    procedureCardsStore.updateCard(editingCard.value.id, {
      duration: value,
    });
  },
});

const notes = computed({
  get: () => editingCard.value?.notes ?? '',
  set: (value: string) => {
    if (!editingCard.value) {
      return;
    }

    procedureCardsStore.updateCard(editingCard.value.id, {
      notes: value,
    });
  },
});
</script>

<template v-if="!!editingCard">
  <FloatLabel>
    <label for="input-title">
      Название процедуры
    </label>

    <InputText id="input-title" v-model="procedureName" />
  </FloatLabel>

  <DatePicker placeholder="Дата" v-model="date" />

  <FloatLabel>
    <label for="input-place">
      Место проведения
    </label>

    <InputText id="input-place" v-model="place" />
  </FloatLabel>

  <FloatLabel>
    <label for="input-duration">
      Длительность
    </label>

    <InputText id="input-duration" v-model="duration" />
  </FloatLabel>

  <FloatLabel>
    <label for="input-note">
      Описание
    </label>

    <InputText id="input-note" v-model="notes" />
  </FloatLabel>

  <FileUpload
    accept="image/*"
    chooseLabel="Фото до"
    uploadLabel="Загрузить"
    cancelLabel="Отменить"
  />

  <FileUpload
    accept="image/*"
    chooseLabel="Фото после"
    uploadLabel="Загрузить"
    cancelLabel="Отменить"
  />
</template>

<style scoped lang="scss">

</style>
