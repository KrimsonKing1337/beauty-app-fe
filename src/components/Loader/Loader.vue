<script setup lang="ts">
type Props = {
  text?: string;
};

withDefaults(defineProps<Props>(), {
  text: 'Загрузка...',
});
</script>

<template>
  <div class="BeautyLoader">
    <div class="Spinner">
      <div class="Dot" />
    </div>

    <p class="Text">
      {{ text }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.BeautyLoader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 220px;
  gap: 16px;

  color: var(--text-secondary, #8f7f86);
}

.Spinner {
  position: relative;

  width: 52px;
  height: 52px;

  border-radius: 50%;

  background:
    conic-gradient(
      from 0deg,
      rgba(214, 132, 166, 0),
      rgba(214, 132, 166, 0.95),
      rgba(214, 132, 166, 0)
    );

  animation: Spin 1.1s linear infinite;

  &:after {
    content: '';

    position: absolute;
    inset: 5px;

    border-radius: 50%;
    background: var(--surface, #fff);
  }
}

.Dot {
  position: absolute;
  top: 3px;
  left: 50%;
  z-index: 1;

  width: 8px;
  height: 8px;

  border-radius: 50%;
  background: #d684a6;
  box-shadow: 0 0 14px rgba(214, 132, 166, 0.7);

  transform: translateX(-50%);
}

.Text {
  margin: 0;

  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
}

@keyframes Spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
