<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';

import type { ProcedureImage } from '@/@types';

import type { PendingProcedureImageFile } from '../../@types';

type ExistingImageViewModel = ProcedureImage & {
  url: string;
};

type PendingImageViewModel = PendingProcedureImageFile & {
  url: string;
};

const props = defineProps<{
  images: ExistingImageViewModel[];
  pendingImages: PendingProcedureImageFile[];
}>();

const emit = defineEmits<{
  (e: 'update:images', value: ProcedureImage[]): void;
  (e: 'update:pendingImages', value: PendingProcedureImageFile[]): void;
}>();

const MAX_IMAGES_COUNT = 10;

const selectedFilesRef = ref<File[] | null>(null);
const objectUrlsByLocalId = ref<Record<string, string>>({});

const imagesCount = computed(() => {
  return props.images.length + props.pendingImages.length;
});

const canAddMoreImages = computed(() => imagesCount.value < MAX_IMAGES_COUNT);

const remainingImagesCount = computed(() => {
  return Math.max(MAX_IMAGES_COUNT - imagesCount.value, 0);
});

const pendingImageViewModels = computed<PendingImageViewModel[]>(() => {
  return props.pendingImages.map((image) => ({
    ...image,
    url: objectUrlsByLocalId.value[image.localId] ?? '',
  }));
});

const revokeObjectUrl = (localId: string) => {
  const url = objectUrlsByLocalId.value[localId];

  if (!url) {
    return;
  }

  URL.revokeObjectURL(url);

  const nextUrls = { ...objectUrlsByLocalId.value };

  delete nextUrls[localId];

  objectUrlsByLocalId.value = nextUrls;
};

const createPendingImage = (file: File): PendingProcedureImageFile => ({
  localId: crypto.randomUUID(),
  file,
  label: '',
});

const addFiles = (files: File[] | File | null) => {
  const fileList = Array.isArray(files) ? files : files ? [files] : [];

  if (!fileList.length) {
    return;
  }

  const availableSlotsCount = remainingImagesCount.value;
  const filesToAdd = fileList.slice(0, availableSlotsCount);
  const newImages = filesToAdd.map(createPendingImage);
  const nextUrls = { ...objectUrlsByLocalId.value };

  newImages.forEach((image) => {
    nextUrls[image.localId] = URL.createObjectURL(image.file);
  });

  objectUrlsByLocalId.value = nextUrls;

  emit('update:pendingImages', [
    ...props.pendingImages,
    ...newImages,
  ]);

  selectedFilesRef.value = null;
};

const updateExistingImageLabel = (id: string, label: string) => {
  emit(
    'update:images',
    props.images.map((image) => {
      if (image.id !== id) {
        return {
          id: image.id,
          path: image.path,
          label: image.label,
        };
      }

      return {
        id: image.id,
        path: image.path,
        label,
      };
    }),
  );
};

const updatePendingImageLabel = (localId: string, label: string) => {
  emit(
    'update:pendingImages',
    props.pendingImages.map((image) => {
      if (image.localId !== localId) {
        return image;
      }

      return {
        ...image,
        label,
      };
    }),
  );
};

const removeExistingImage = (id: string) => {
  emit(
    'update:images',
    props.images
      .filter((image) => image.id !== id)
      .map((image) => ({
        id: image.id,
        path: image.path,
        label: image.label,
      })),
  );
};

const removePendingImage = (localId: string) => {
  revokeObjectUrl(localId);

  emit(
    'update:pendingImages',
    props.pendingImages.filter((image) => image.localId !== localId),
  );
};

watch(
  () => props.pendingImages.map((image) => image.localId),
  (localIds) => {
    const localIdsSet = new Set(localIds);

    Object.keys(objectUrlsByLocalId.value).forEach((localId) => {
      if (!localIdsSet.has(localId)) {
        revokeObjectUrl(localId);
      }
    });
  },
);

onBeforeUnmount(() => {
  Object.values(objectUrlsByLocalId.value).forEach((url) => {
    URL.revokeObjectURL(url);
  });
});
</script>

<template>
  <section class="UploadImages">
    <div class="Header">
      <div>
        <div class="Title">
          Фотографии
        </div>

        <div class="Hint">
          Можно добавить до {{ MAX_IMAGES_COUNT }} фото и подписать каждое
        </div>
      </div>

      <div class="Counter">
        {{ imagesCount }} / {{ MAX_IMAGES_COUNT }}
      </div>
    </div>

    <div v-if="images.length || pendingImages.length" class="ImagesGrid">
      <div
        v-for="imageCur in images"
        :key="imageCur.id"
        class="ImageCard"
      >
        <div class="Preview">
          <img
            :src="imageCur.url"
            :alt="imageCur.label || 'Фото процедуры'"
          />
        </div>

        <VTextField
          :model-value="imageCur.label"
          label="Подпись"
          variant="outlined"
          bg-color="#fff"
          rounded="lg"
          density="compact"
          hide-details
          @update:model-value="updateExistingImageLabel(imageCur.id, $event)"
        />

        <VBtn
          class="RemoveButton"
          color="error"
          variant="tonal"
          size="small"
          block
          @click="removeExistingImage(imageCur.id)"
        >
          Удалить
        </VBtn>
      </div>

      <div
        v-for="imageCur in pendingImageViewModels"
        :key="imageCur.localId"
        class="ImageCard"
      >
        <div class="Preview">
          <img
            :src="imageCur.url"
            :alt="imageCur.label || 'Новое фото процедуры'"
          />
        </div>

        <VTextField
          :model-value="imageCur.label"
          label="Подпись"
          variant="outlined"
          bg-color="#fff"
          rounded="lg"
          density="compact"
          hide-details
          @update:model-value="updatePendingImageLabel(imageCur.localId, $event)"
        />

        <VBtn
          class="RemoveButton"
          color="error"
          variant="tonal"
          size="small"
          block
          @click="removePendingImage(imageCur.localId)"
        >
          Удалить
        </VBtn>
      </div>
    </div>

    <div v-else class="EmptyState">
      Пока нет фотографий
    </div>

    <VFileInput
      v-if="canAddMoreImages"
      v-model="selectedFilesRef"
      class="FileInput"
      accept="image/*"
      label="Добавить фотографии"
      prepend-icon="mdi-camera-plus"
      multiple
      clearable
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      :hint="`Можно добавить ещё ${remainingImagesCount}`"
      persistent-hint
      @update:model-value="addFiles"
    />
  </section>
</template>

<style scoped lang="scss">
.UploadImages {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
}

.Header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.Title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
}

.Hint,
.Counter {
  font-size: 13px;
  color: var(--text-secondary);
}

.Counter {
  white-space: nowrap;
}

.ImagesGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.ImageCard {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--surface-muted);
}

.Preview {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 14px;
  background: var(--surface);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.RemoveButton {
  margin-top: 2px;
}

.EmptyState {
  display: grid;
  min-height: 120px;
  place-items: center;
  border: 1px dashed var(--border);
  border-radius: 18px;
  color: var(--text-tertiary);
  font-size: 13px;
  background: var(--surface-muted);
}

.FileInput {
  margin-top: 4px;
}
</style>
