<script setup lang="ts">
import { useRoute } from 'vue-router';

import {
  PageHeader,
  ProcedureCards,
  Reminders,
  BottomNav,
} from '@/components';

const route = useRoute();
</script>

<template>
  <div class="MainPage">
    <div class="MainPageContent">
      <PageHeader />

      <ProcedureCards v-if="route.path === '/'" />
      <Reminders v-if="route.path === '/reminders'" />

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
