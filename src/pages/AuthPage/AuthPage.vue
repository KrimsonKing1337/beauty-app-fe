<script setup lang="ts">
import {
  Background,
  ContentHeader,
  CardHeader,
  Form,
} from './components';
</script>

<template>
  <div class="AuthPage">
    <Background />

    <div class="Content">
      <ContentHeader />

      <div class="Card">
        <CardHeader />
        <Form />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.AuthPage {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, #fff6f8 0%, transparent 34%),
    radial-gradient(circle at bottom right, #f8e9ee 0%, transparent 30%),
    linear-gradient(180deg, #fcf9fa 0%, #f6f1f3 100%);
}

.Content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 24px;
  align-content: center;
  width: 100%;
  max-width: 460px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px;
}

.Card {
  padding: 24px;
  border: 1px solid rgba(236, 227, 231, 0.9);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 20px 60px rgba(43, 24, 31, 0.08);
  backdrop-filter: blur(18px);
}

@media (max-width: 480px) {
  .Content {
    padding: 16px;
  }

  .Card {
    padding: 20px;
    border-radius: 24px;
  }

  .Row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
