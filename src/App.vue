<script setup lang="ts">
import { watch } from 'vue';

import { Capacitor } from '@capacitor/core';

import { RouterView, useRouter } from 'vue-router';

import { useQueryClient } from '@tanstack/vue-query';

import { setUnauthorizedHandler } from '@/api/client.ts';
import { getErrorMessage } from '@/api/errors';
import { getRemindersPage } from '@/api/reminders';

import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';

import { useMeQuery } from '@/composables/queries/auth/useMeQuery';
import { buildRemindersQueryParams } from '@/composables/queries/reminders/buildRemindersQueryParams.ts';

import { AppToast } from '@/components';

import {
  clearAllReminderNotifications,
  syncAllReminderNotifications,
} from '@/utils/reminderNotifications';

const router = useRouter();
const queryClient = useQueryClient();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();
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

    // синкаем нотификации только если это натив
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    try {
      const { items } = await queryClient.fetchQuery({
        queryKey: ['reminders', buildRemindersQueryParams({ isCompleted: false })],
        queryFn: () => getRemindersPage(buildRemindersQueryParams({ isCompleted: false })),
      });

      await syncAllReminderNotifications(items);
    } catch (error) {
      notificationStore.showError(getErrorMessage(error));
    }
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

  <AppToast />
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
