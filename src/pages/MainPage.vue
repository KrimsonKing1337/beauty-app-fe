<script setup lang="ts">
  import { onMounted } from 'vue';

  import { ProcedureCard, PageHeader, BeforeAfter, BottomNav, Notes, Chip } from '@/components';

  onMounted(() => {
    console.log('Main page mounted');
  });
</script>

<template>
  <div class="MainPage">
    <div class="MainPageContent">
      <PageHeader />
      <ProcedureCard />
      <BeforeAfter />
      <Notes>
        Обновили покрытие, использовали новый оттенок
      </Notes>

      <div>
        <Chip>
          Чип 1
        </Chip>

        <Chip>
          Чип 2
        </Chip>

        <Chip>
          Чип 3
        </Chip>
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
</style>
