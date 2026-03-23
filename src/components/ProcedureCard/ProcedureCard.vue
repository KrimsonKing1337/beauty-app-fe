<script setup lang="ts">
import {
  type ChipsProps,
  BeforeAfter,
  Chips,
  Notes,
  ProcedureCardHeader,
} from '@/components';

const chips: ChipsProps['chips'] = [
  {
    id: '1',
    label: 'Чип 1',
    isActive: true,
  },
  {
    id: '2',
    label: 'Чип 2',
  },
  {
    id: '3',
    label: 'Чип 3',
  }
];
</script>

<template>
  <div class="ProcedureCard">
    <ProcedureCardHeader />
    <BeforeAfter />

    <Notes>
      Обновили покрытие, использовали новый оттенок
    </Notes>

    <Chips :chips="chips" />
  </div>
</template>

<style scoped lang="scss">
  .ProcedureCard {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
  }
</style>
