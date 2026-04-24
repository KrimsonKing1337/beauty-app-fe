<script setup lang="ts">

</script>

<template>
  <div class="CardHeader">
    <div class="Title text-title-large">
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
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.Subtitle {
  color: var(--text-secondary);
}
</style>
