<script setup lang="ts">
import { computed } from 'vue';

type Slide = {
  id: string;
  label: string;
  imagePath: string;
  type: 'before' | 'after';
};

const props = defineProps<{
  modelValue: boolean;
  index: number;
  slides: Slide[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'update:index', value: number): void;
  (e: 'close'): void;
}>();

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit('update:modelValue', value);

    if (!value) {
      emit('close');
    }
  },
});

const carouselIndexModel = computed({
  get: () => props.index,
  set: (value: number) => {
    emit('update:index', value);
  },
});
</script>

<template>
  <VDialog
    v-model="dialogModel"
    fullscreen
  >
    <VCard class="DialogContent" rounded="0">
      <div class="TopBar">
        <div class="Counter">
          {{ index + 1 }} / {{ slides.length }}
        </div>

        <VBtn
          icon="mdi-close"
          variant="text"
          @click="dialogModel = false"
        />
      </div>

      <VCarousel
        v-model="carouselIndexModel"
        class="Carousel"
        height="100vh"
        touch
        hide-delimiter-background
        show-arrows="hover"
        color="var(--surface-muted)"
      >
        <VCarouselItem
          v-for="slide in slides"
          :key="slide.id"
        >
          <div class="Slide">
            <div class="SlideLabel">
              {{ slide.label }}
            </div>

            <VImg
              :src="slide.imagePath"
              class="SlideImage"
              contain
            />
          </div>
        </VCarouselItem>
      </VCarousel>
    </VCard>
  </VDialog>
</template>

<style scoped lang="scss">
.DialogContent {
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.96);
  color: #fff;
}

.TopBar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
}

.Counter {
  font-size: 14px;
}

.Slide {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 56px 16px 24px;
  box-sizing: border-box;
}

.SlideLabel {
  margin-bottom: 12px;
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.SlideImage {
  flex: 1;
}

.Carousel {
  :deep(.v-window__controls) {
    .v-btn {
      color: var(--text-secondary);
      background-color: var(--surface-muted);
    }
  }
}
</style>
