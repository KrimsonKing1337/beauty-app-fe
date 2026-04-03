<script setup lang="ts">
import { watch } from 'vue';
import { RouterView } from 'vue-router';

import { useAuthStore } from '@/stores/authStore';
import { useMeQuery } from '@/composables/queries/auth/useMeQuery';

const authStore = useAuthStore();
const meQuery = useMeQuery();

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
