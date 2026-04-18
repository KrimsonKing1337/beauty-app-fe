<script setup lang="ts">
import { useRoute } from 'vue-router';

import { Calendar, ProcedureCardsPage, RemindersPage } from '@/pages';

import { PageHeader, BottomNav } from '@/components';

const route = useRoute();
</script>

<template>
  <div class="MainPage">
    <div class="Content">
      <PageHeader />

      <ProcedureCardsPage v-if="route.path === '/'" />
      <RemindersPage v-if="route.path === '/reminders'" />
      <Calendar v-if="route.path === '/calendar'" />

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
