<script setup lang="ts">
import { storeToRefs } from 'pinia';

import {
  InputText,
  FloatLabel,
  DatePicker,
  FileUpload,
} from 'primevue';

import { useProcedureCardStore } from '@/stores/procedureCardStore';

const procedureCardStore = useProcedureCardStore();
const { card } = storeToRefs(procedureCardStore);
</script>

<template>
  <FloatLabel>
    <label for="input-title">
      Название процедуры
    </label>

    <InputText id="input-title" v-model="card.name" />
  </FloatLabel>

  <DatePicker placeholder="Дата" v-model="card.date" />

  <FloatLabel>
    <label for="input-place">
      Место проведения
    </label>

    <InputText id="input-place" v-model="card.place" />
  </FloatLabel>

  <FloatLabel>
    <label for="input-duration">
      Длительность
    </label>

    <InputText id="input-duration" v-model="card.duration" />
  </FloatLabel>

  <FloatLabel>
    <label for="input-note">
      Описание
    </label>

    <InputText id="input-note" v-model="card.notes" />
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
