<script setup lang="ts">
import { ref } from 'vue';

import { ImageFullScreen } from './components';

type Props = {
  beforeImagePaths: string[];
  afterImagePaths: string[];
};

defineProps<Props>();

const isBeforeFullScreenOpen = ref(false);
const isAfterFullScreenOpen = ref(false);
</script>

<template>
  <div class="BeforeAfter">
    <ImageFullScreen
      v-if="isBeforeFullScreenOpen && beforeImagePaths[0]"
      :image-path="beforeImagePaths[0]"
      @close="isBeforeFullScreenOpen = false"
    />

    <ImageFullScreen
      v-if="isAfterFullScreenOpen && afterImagePaths[0]"
      :image-path="afterImagePaths[0]"
      @close="isAfterFullScreenOpen = false"
    />

    <div class="Item">
      <div class="Label">
        До
      </div>

      <div class="Image">
        <div v-if="!beforeImagePaths.length" class="ImagePlaceholder">
          Фото до
        </div>

        <img
          v-else
          :src="beforeImagePaths[0]"
          alt="Фото до"
          @click="isBeforeFullScreenOpen = true"
        />
      </div>
    </div>

    <div class="Item">
      <div class="Label">
        После
      </div>

      <div class="Image">
        <div v-if="!afterImagePaths.length" class="ImagePlaceholder">
          Фото после
        </div>

        <img
          v-else
          :src="afterImagePaths[0]"
          alt="Фото после"
          @click="isAfterFullScreenOpen = true"
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
}

.Item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.Label {
  font-size: var(--fs-caption);
  color: var(--text-secondary);
  font-weight: var(--fw-medium);
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
  }
}

.ImagePlaceholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--text-tertiary);
  font-size: var(--fs-caption);
}
</style>
