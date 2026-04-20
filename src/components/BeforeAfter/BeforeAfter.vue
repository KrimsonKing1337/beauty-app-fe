<script setup lang="ts">
import { computed, ref } from 'vue';

import { ImageFullScreen } from './components';

type Props = {
  beforeImagePaths: string[];
  afterImagePaths: string[];
};

const props = defineProps<Props>();

type FullScreenType = 'before' | 'after' | null;

const fullScreenType = ref<FullScreenType>(null);

const beforeImagePath = computed(() => props.beforeImagePaths[0] ?? null);
const afterImagePath = computed(() => props.afterImagePaths[0] ?? null);

const fullScreenImagePath = computed<string | null>(() => {
  if (fullScreenType.value === 'before') {
    return beforeImagePath.value;
  }

  if (fullScreenType.value === 'after') {
    return afterImagePath.value;
  }

  return null;
});

const openBeforeFullScreen = () => {
  if (!beforeImagePath.value) {
    return;
  }

  fullScreenType.value = 'before';
};

const openAfterFullScreen = () => {
  if (!afterImagePath.value) {
    return;
  }

  fullScreenType.value = 'after';
};

const closeFullScreen = () => {
  fullScreenType.value = null;
};

const showNextFullScreen = () => {
  if (fullScreenType.value === 'before' && afterImagePath.value) {
    fullScreenType.value = 'after';
  }
};

const showPreviousFullScreen = () => {
  if (fullScreenType.value === 'after' && beforeImagePath.value) {
    fullScreenType.value = 'before';
  }
};
</script>

<template>
  <div class="BeforeAfter">
    <ImageFullScreen
      v-if="fullScreenType && fullScreenImagePath"
      :image-path="fullScreenImagePath"
      @close="closeFullScreen"
      @next="showNextFullScreen"
      @prev="showPreviousFullScreen"
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
