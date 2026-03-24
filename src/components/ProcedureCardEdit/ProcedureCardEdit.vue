<script setup lang="ts">
import {
  InputText,
  FloatLabel,
  DatePicker,
  FileUpload,
} from 'primevue';
</script>

<template>
  <FloatLabel>
    <label for="input-title">
      Название процедуры
    </label>

    <InputText id="input-title" />
  </FloatLabel>

  <DatePicker placeholder="Дата" />

  <FloatLabel>
    <label for="input-time">
      Время
    </label>

    <InputText id="input-time" />
  </FloatLabel>

  <FloatLabel>
    <label for="input-place">
      Место проведения
    </label>

    <InputText id="input-place" />
  </FloatLabel>

  <FloatLabel>
    <label for="input-duration">
      Длительность
    </label>

    <InputText id="input-duration" />
  </FloatLabel>

  <FloatLabel>
    <label for="input-note">
      Описание
    </label>

    <InputText id="input-note" />
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
