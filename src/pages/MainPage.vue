<script setup lang="ts">
import { onMounted } from 'vue';

import {
  PageHeader,
  ProcedureCard,
  BottomNav,
  ProcedureCardEdit,
} from '@/components';

onMounted(() => {
  console.log('Main page mounted');
});
</script>

<template>
  <div class="MainPage">
    <div class="MainPageContent">
      <PageHeader />

      <div class="ProcedureCardsWrapper">
        <ProcedureCard
          title="Маникюр"
          meta="20 марта 2026 - салон - 90 мин"
          price="1 500 Р"
          notes="Обновили покрытие, использовали новый оттенок"
        />

        <ProcedureCard
          title="Педикюр"
          meta="21 марта 2026 - салон - 90 мин"
          price="2 500 Р"
          :beforeAfter="false"
        />

        <ProcedureCardEdit />
      </div>
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

.ProcedureCardsWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-16);
}
</style>
