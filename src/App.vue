<script setup lang="ts">
import { watch } from 'vue';
import { RouterView, useRouter } from 'vue-router';

import { setUnauthorizedHandler } from '@/api/client.ts';
import { useAuthStore } from '@/stores/authStore';
import { useMeQuery } from '@/composables/queries/auth/useMeQuery';

const router = useRouter();
const authStore = useAuthStore();
const meQuery = useMeQuery();

setUnauthorizedHandler(() => {
  authStore.clearAuth();

  router.push('/login');
});

watch(
  () => meQuery.data.value,
  (data) => {
    if (!data) {
      return;
    }

    authStore.setUser(data.user);
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
  },
);
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
