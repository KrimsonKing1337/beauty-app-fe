<script setup lang="ts">

</script>

<template>
  <div class="CardHeader">
    <div class="Title">
      Авторизация
    </div>

    <div class="Subtitle">
      Введи логин и пароль, чтобы продолжить
    </div>
  </div>
</template>

<style scoped lang="scss">
.CardHeader {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.Title {
  font-size: var(--fs-h2);
  line-height: var(--lh-h2);
  font-weight: var(--fw-semibold);
  color: var(--text-primary);
}

.Subtitle {
  color: var(--text-secondary);
}
</style>
