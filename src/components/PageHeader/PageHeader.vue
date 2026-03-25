<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const title = computed(() => {
  return route.path !== '/reminders' ? 'Мои процедуры' : 'Мои напоминания';
});

const subTitle = computed(() => {
  return route.path !== '/reminders' ? 'История ухода и результат по фото' : '';
});
</script>

<template>
  <header class="PageHeader">
    <div class="PageHeaderDate">
      Сегодня, 22 марта
    </div>

    <h1 class="PageHeaderTitle">
      {{ title }}
    </h1>

    <p class="PageHeaderSubtitle">
      {{ subTitle }}
    </p>
  </header>
</template>

<style scoped lang="scss">
  .PageHeader {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 24px;
  }

  .PageHeaderDate {
    font-size: var(--fs-caption);
    color: var(--text-secondary);
  }

  .PageHeaderTitle {
    font-size: var(--fs-display);
    line-height: var(--lh-display);
    font-weight: var(--fw-semibold);
    margin: 0;
  }

  .PageHeaderSubtitle {
    margin: 0;
    color: var(--text-secondary);
  }
</style>
