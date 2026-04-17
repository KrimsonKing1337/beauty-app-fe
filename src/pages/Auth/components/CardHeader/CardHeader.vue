<script setup lang="ts">

</script>

<template>
  <div class="CardHeader">
    <h2 class="Title">
      Авторизация
    </h2>

    <p class="Subtitle">
      Введи логин и пароль, чтобы продолжить
    </p>
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
