<script setup lang="ts">

</script>

<template>
  <div class="ProcedureCard">
    <div class="ProcedureCardTitleWrapper">
      <h2 class="ProcedureCardTitle">
        Маникюр
      </h2>

      <div class="ProcedureCardMeta">
        20 марта · салон · 90 мин
      </div>
    </div>

    <div class="ProcedureCardPrice">
      1 500 ₽
    </div>
  </div>
</template>

<style scoped lang="scss">
  .ProcedureCard {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .ProcedureCardTitleWrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .ProcedureCardTitle {
    margin: 0;
    font-size: var(--fs-title);
    line-height: var(--lh-title);
    font-weight: var(--fw-semibold);
  }

  .ProcedureCardMeta {
    font-size: var(--fs-caption);
    line-height: var(--lh-caption);
    color: var(--text-secondary);
  }

  .ProcedureCardPrice {
    white-space: nowrap;
    font-size: var(--fs-title);
    font-weight: var(--fw-semibold);
  }
</style>
