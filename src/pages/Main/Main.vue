<script setup lang="ts">
import { useRoute } from 'vue-router';

import { Calendar, ProcedureCardsPage, RemindersPage } from '@/pages';

import { PageHeader, BottomNav } from '@/components';

import { ReminderNotifications } from './components';

const route = useRoute();
</script>

<template>
  <div class="MainPage">
    <div class="Content">
      <PageHeader />
      <ReminderNotifications />

      <Transition name="page" mode="out-in">
        <ProcedureCardsPage v-if="route.path === '/'" />
        <RemindersPage v-else-if="route.path === '/reminders'" />
        <Calendar v-else-if="route.path === '/calendar'" />
      </Transition>

      <BottomNav />
    </div>
  </div>
</template>

<style scoped lang="scss">
.MainPage {
  height: 100%;
  min-height: 100vh;
  padding: 20px;
  background: #f8f6f7;
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

.Reminders {
  position: absolute;
  z-index: 1;
  top: 25px;
  right: 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
