<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils';

const route = useRoute();

const date = formatDate(new Date());

const title = computed(() => {
  return route.path !== '/reminders' ? 'Мои процедуры' : 'Мои напоминания';
});

const subTitle = computed(() => {
  return route.path !== '/reminders' ? 'История ухода и результат по фото' : '';
});
</script>

<template>
  <header class="PageHeader">
    <div class="Date">
      Сегодня, {{ date }}
    </div>

    <h1 class="Title">
      {{ title }}
    </h1>

    <p class="Subtitle">
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

  .Date {
    font-size: var(--fs-caption);
    color: var(--text-secondary);
  }

  .Title {
    font-size: var(--fs-display);
    line-height: var(--lh-display);
    font-weight: var(--fw-semibold);
    margin: 0;
  }

  .Subtitle {
    margin: 0;
    color: var(--text-secondary);
  }
</style>
