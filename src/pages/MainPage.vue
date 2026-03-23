<script setup lang="ts">

import { onMounted } from 'vue';

import {
  PageHeader,
  ProcedureCard,
  BottomNav,
} from '@/components';

onMounted(() => {
  console.log('Main page mounted');
});

</script>

<template>
  <div class="MainPage">
    <div class="MainPageContent">
      <PageHeader />
      <ProcedureCard />
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
