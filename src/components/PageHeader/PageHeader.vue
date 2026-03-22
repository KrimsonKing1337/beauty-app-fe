<script setup lang="ts">

</script>

<template>
  <header class="PageHeader">
    <div class="PageHeaderDate">
      Сегодня, 22 марта
    </div>

    <h1 class="PageHeaderTitle">
      Мои процедуры
    </h1>

    <p class="PageHeaderSubtitle">
      История ухода и результат по фото
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
