<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

defineProps<{ imagePath: string }>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'next'): void;
  (e: 'prev'): void;
}>();

const pointerStartX = ref<number | null>(null);

const MIN_SWIPE_DISTANCE = 50;

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close');
  }

  if (event.key === 'ArrowLeft') {
    emit('prev');
  }

  if (event.key === 'ArrowRight') {
    emit('next');
  }
};

const onPointerDown = (event: PointerEvent) => {
  pointerStartX.value = event.clientX;
};

const onPointerUp = (event: PointerEvent) => {
  if (pointerStartX.value === null) {
    return;
  }

  const diffX = pointerStartX.value - event.clientX;

  pointerStartX.value = null;

  if (Math.abs(diffX) < MIN_SWIPE_DISTANCE) {
    return;
  }

  if (diffX > 0) {
    emit('next');

    return;
  }

  emit('prev');
};

onMounted(() => {
  setTimeout(() => {
    document.addEventListener('keydown', handleKeydown);
  }, 0);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div
    class="ImageFullScreen"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
  >
    <button
      type="button"
      class="CloseButton"
      aria-label="Закрыть изображение"
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
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: pan-y;
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
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }
}

.Image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}
</style>
