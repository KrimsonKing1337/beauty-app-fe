<script setup lang="ts">
import { ref } from 'vue';

const typeValue = ref(1);
const customTypeValue = ref('');

const procedureTypesOptions = [
  { title: 'Эпиляция', value: 1 },
  { title: 'Массаж', value: 2 },
  { title: 'Маникюр', value: 3 },
  { title: 'Педикюр', value: 4 },
  { title: 'Волосы', value: 5 },
  { title: 'Добавить свой', value: 6 },
];
</script>

<template>
  <div class="ProcedureTypeSelect" :class="{ isActive: typeValue === 6 }">
    <VSelect
      v-model="typeValue"
      :items="procedureTypesOptions"
      label="Тип процедуры"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
    />

    <VTextField
      v-if="typeValue === 6"
      v-model="customTypeValue"
      label="Название нового типа"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
    />
  </div>
</template>

<style scoped lang="scss">
.ProcedureTypeSelect {
  border: 0 transparent solid;
  border-radius: 12px;
  padding: 0;
  transition: border 0.2s, padding 0.2s;

  &.isActive {
    border: 1px #ccc solid;
    padding: 20px;
  }
}
</style>
