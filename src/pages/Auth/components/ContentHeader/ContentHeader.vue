<script setup lang="ts">

</script>

<template>
  <div class="ContentHeader">
    <span class="Badge">
      Beauty App
    </span>

    <h1 class="PageTitle">
      Вход в личный кабинет
    </h1>

    <p class="Description">
      Храни историю процедур, расходы, фотографии и напоминания в одном месте.
    </p>
  </div>
</template>

<style scoped lang="scss">
.ContentHeader {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
}

.Badge {
  align-self: center;
  padding: 6px 12px;
  border: 1px solid rgba(217, 142, 161, 0.28);
  border-radius: 999px;
  font-size: var(--fs-caption);
  line-height: var(--lh-caption);
  font-weight: var(--fw-medium);
  color: var(--accent-hover);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(10px);
}

.PageTitle {
  font-size: clamp(28px, 5vw, 36px);
  line-height: 1.12;
  font-weight: 700;
  color: var(--text-primary);
}

.Description {
  max-width: 360px;
  margin: 0 auto;
  color: var(--text-secondary);
}
</style>
