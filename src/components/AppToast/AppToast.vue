<script setup lang="ts">
import { computed } from 'vue';

import { storeToRefs } from 'pinia';

import { useNotificationStore } from '@/stores/notificationStore';

const notificationStore = useNotificationStore();

const {
  isVisible,
  type,
  title,
  message,
} = storeToRefs(notificationStore);

const color = computed(() => {
  if (type.value === 'error') {
    return 'red-lighten-5';
  }

  if (type.value === 'success') {
    return 'green-lighten-5';
  }

  return 'blue-lighten-5';
});

const icon = computed(() => {
  if (type.value === 'error') {
    return 'mdi-alert-circle-outline';
  }

  if (type.value === 'success') {
    return 'mdi-check-circle-outline';
  }

  return 'mdi-information-outline';
});
</script>

<template>
  <VSnackbar
    v-model="isVisible"
    :timeout="5000"
    location="top"
    rounded="xl"
    :color="color"
  >
    <div class="AppToast">
      <VIcon :icon="icon" />

      <div class="Content">
        <div class="Title">
          {{ title }}
        </div>

        <div class="Message">
          {{ message }}
        </div>
      </div>

      <VBtn
        icon="mdi-close"
        variant="text"
        size="small"
        @click="notificationStore.close"
      />
    </div>
  </VSnackbar>
</template>

<style scoped lang="scss">
.AppToast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: var(--text-primary);
}

.Content {
  flex: 1;
}

.Title {
  font-weight: 700;
}

.Message {
  margin-top: 2px;
  color: var(--text-secondary);
}
</style>
