<script setup lang="ts">
import { watch } from 'vue';

import { RouterView, useRouter } from 'vue-router';

import { setUnauthorizedHandler } from '@/api/client.ts';
import { getReminders } from '@/api/reminders';

import { useAuthStore } from '@/stores/authStore';

import { useMeQuery } from '@/composables/queries/auth/useMeQuery';

import {
  clearAllReminderNotifications,
  syncAllReminderNotifications,
} from '@/utils/reminderNotifications';

const router = useRouter();
const authStore = useAuthStore();
const meQuery = useMeQuery();

setUnauthorizedHandler(() => {
  authStore.clearAuth();

  clearAllReminderNotifications();

  router.push('/login');
});

watch(
  () => meQuery.data.value,
  async (data) => {
    if (!data) {
      return;
    }

    authStore.setUser(data.user);

    const reminders = await getReminders();

    await syncAllReminderNotifications(reminders);
  },
  {
    immediate: true,
  },
);

watch(
  () => meQuery.error.value,
  (error) => {
    if (!error) {
      return;
    }

    authStore.clearAuth();

    clearAllReminderNotifications();
  },
);
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <Component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
