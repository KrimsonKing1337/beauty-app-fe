<script setup lang="ts">
import { computed, ref } from 'vue';

import { ImageCarouselDialog } from './components';

type Props = {
  beforeImagePaths: string[];
  afterImagePaths: string[];
};

const props = defineProps<Props>();

type Slide = {
  id: string;
  label: string;
  imagePath: string;
  type: 'before' | 'after';
};

const isDialogOpen = ref(false);
const activeSlideIndex = ref(0);

const beforeImagePath = computed(() => props.beforeImagePaths[0] ?? null);
const afterImagePath = computed(() => props.afterImagePaths[0] ?? null);

const slides = computed<Slide[]>(() => {
  const result: Slide[] = [];

  if (beforeImagePath.value) {
    result.push({
      id: 'before',
      label: 'До',
      imagePath: beforeImagePath.value,
      type: 'before',
    });
  }

  if (afterImagePath.value) {
    result.push({
      id: 'after',
      label: 'После',
      imagePath: afterImagePath.value,
      type: 'after',
    });
  }

  return result;
});

const openSlide = (type: 'before' | 'after') => {
  const index = slides.value.findIndex((slide) => slide.type === type);

  if (index === -1) {
    return;
  }

  activeSlideIndex.value = index;
  isDialogOpen.value = true;
};

const openBeforeFullScreen = () => {
  openSlide('before');
};

const openAfterFullScreen = () => {
  openSlide('after');
};

const closeFullScreen = () => {
  isDialogOpen.value = false;
};
</script>

<template>
  <div class="BeforeAfter">
    <ImageCarouselDialog
      v-model="isDialogOpen"
      v-model:index="activeSlideIndex"
      :slides="slides"
      @close="closeFullScreen"
    />

    <div class="Item">
      <div class="Label">
        До
      </div>

      <div class="Image">
        <div v-if="!beforeImagePath" class="ImagePlaceholder">
          Фото до
        </div>

        <img
          v-else
          :src="beforeImagePath"
          alt="Фото до"
          @click="openBeforeFullScreen"
        />
      </div>
    </div>

    <div class="Item">
      <div class="Label">
        После
      </div>

      <div class="Image">
        <div v-if="!afterImagePath" class="ImagePlaceholder">
          Фото после
        </div>

        <img
          v-else
          :src="afterImagePath"
          alt="Фото после"
          @click="openAfterFullScreen"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.BeforeAfter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
}

.Item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.Label {
  font-size: 13px;
  color: var(--text-secondary);
}

.Image {
  aspect-ratio: 4 / 5;
  border-radius: 18px;
  overflow: hidden;
  background: var(--surface-muted);
  border: 1px solid var(--border);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    cursor: pointer;
  }
}

.ImagePlaceholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--text-tertiary);
  font-size: 13px;
}
</style>
