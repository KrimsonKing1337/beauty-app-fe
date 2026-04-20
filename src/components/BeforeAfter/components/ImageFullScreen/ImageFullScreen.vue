<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

defineProps<{ imagePath: string }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleKeypress = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close');
  }
};

onMounted(() => {
  setTimeout(() => {
    document.addEventListener('keydown', handleKeypress);
  }, 0);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeypress);
});
</script>

<template>
  <div class="ImageFullScreen">
    <button
      type="button"
      class="CloseButton"
      aria-label="Закрыть уведомление"
      @click="emit('close')"
    >
      ×
    </button>

    <img :src="imagePath" alt="" class="Image" />
  </div>
</template>

<style scoped lang="scss">
.ImageFullScreen {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.CloseButton {
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  min-width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #6b7280;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s ease,
  color 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
    color: #1f1f1f;
  }
}

.Image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
