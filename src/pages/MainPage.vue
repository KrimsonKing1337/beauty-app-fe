<script setup lang="ts">
import type { ChipsProps } from '@/components';

import { onMounted } from 'vue';

import {
  ProcedureCardHeader,
  PageHeader,
  BeforeAfter,
  BottomNav,
  Notes,
  Chips,
} from '@/components';

onMounted(() => {
  console.log('Main page mounted');
});

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
  <div class="MainPage">
    <div class="MainPageContent">
      <PageHeader />
      <ProcedureCardHeader />
      <BeforeAfter />

      <Notes>
        Обновили покрытие, использовали новый оттенок
      </Notes>

      <Chips :chips="chips" />

      <BottomNav />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .MainPage {
    min-height: 100vh;
    padding: 20px;
    background: var(--bg);
  }

  .MainPageContent {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
  }
</style>
