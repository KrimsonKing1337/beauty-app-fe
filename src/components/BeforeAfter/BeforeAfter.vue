<script setup lang="ts">
import { computed, ref } from 'vue';

import type { ProcedureImage } from '@/@types';

import { ImageCarouselDialog } from './components';

type Props = {
  images: ProcedureImage[];
};

const props = defineProps<Props>();

type Slide = {
  id: string;
  label: string;
  imagePath: string;
};

const isDialogOpen = ref(false);
const activeSlideIndex = ref(0);

const slides = computed<Slide[]>(() => {
  return props.images.map((image) => ({
    id: image.id,
    label: image.label,
    imagePath: image.path,
  }));
});

const openFullScreen = (imageId: string) => {
  const index = slides.value.findIndex((slide) => slide.id === imageId);

  if (index === -1) {
    return;
  }

  activeSlideIndex.value = index;
  isDialogOpen.value = true;
};

const closeFullScreen = () => {
  isDialogOpen.value = false;
};
</script>

<template>
  <div class="ProcedureImages">
    <ImageCarouselDialog
      v-model="isDialogOpen"
      v-model:index="activeSlideIndex"
      :slides="slides"
      @close="closeFullScreen"
    />

    <div
      v-for="image in images"
      :key="image.id"
      class="Item"
    >
      <button
        class="ImageButton"
        type="button"
        @click="openFullScreen(image.id)"
      >
        <img
          :src="image.path"
          :alt="image.label || 'Фото процедуры'"
        />
      </button>

      <div class="Label">
        {{ image.label }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ProcedureImages {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.Item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.ImageButton {
  width: 100%;
  aspect-ratio: 4 / 5;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  background: var(--surface-muted);
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.Label {
  font-size: 13px;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
