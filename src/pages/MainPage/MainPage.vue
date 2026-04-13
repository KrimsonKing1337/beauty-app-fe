<script setup lang="ts">
import { useRoute } from 'vue-router';

import {
  PageHeader,
  ProcedureCardsWrapper,
  Reminders,
  BottomNav,
} from '@/components';

import { CalendarPage } from '@/pages';

const route = useRoute();
</script>

<template>
  <div class="MainPage">
    <div class="Content">
      <PageHeader />

      <ProcedureCardsWrapper v-if="route.path === '/'" />
      <Reminders v-if="route.path === '/reminders'" />
      <CalendarPage v-if="route.path === '/calendar'" />

      <BottomNav />
    </div>
  </div>
</template>

<style scoped lang="scss">
.MainPage {
  height: 100%;
  min-height: 100vh;
  padding: 20px;
  background: var(--bg);
}

.Content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  max-width: 720px;
  height: 100%;
  min-height: calc(100vh - 40px);
  margin: 0 auto;
}
</style>
