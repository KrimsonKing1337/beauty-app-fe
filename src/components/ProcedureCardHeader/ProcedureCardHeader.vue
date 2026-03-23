<script setup lang="ts">

</script>

<template>
  <div class="ProcedureCardHeader">
    <div class="ProcedureCardHeaderTitleWrapper">
      <h2 class="ProcedureCardHeaderTitle">
        Маникюр
      </h2>

      <div class="ProcedureCardHeaderMeta">
        20 марта · салон · 90 мин
      </div>
    </div>

    <div class="ProcedureCardHeaderPrice">
      1 500 ₽
    </div>
  </div>
</template>

<style scoped lang="scss">
  .ProcedureCardHeader {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .ProcedureCardHeaderTitleWrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .ProcedureCardHeaderTitle {
    margin: 0;
    font-size: var(--fs-title);
    line-height: var(--lh-title);
    font-weight: var(--fw-semibold);
  }

  .ProcedureCardHeaderMeta {
    font-size: var(--fs-caption);
    line-height: var(--lh-caption);
    color: var(--text-secondary);
  }

  .ProcedureCardHeaderPrice {
    white-space: nowrap;
    font-size: var(--fs-title);
    font-weight: var(--fw-semibold);
  }
</style>
