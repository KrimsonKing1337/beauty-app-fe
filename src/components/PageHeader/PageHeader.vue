<script setup lang="ts">
import { computed } from 'vue';

import { useRoute, useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/authStore';

import { Button } from '@/components';

import { formatDate } from '@/utils';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const date = formatDate(new Date().toISOString());

const title = computed(() => {
  switch (route.path) {
    case '/':
      return 'Мои процедуры';
    case '/reminders':
      return 'Мои напоминания';
    case '/calendar':
      return 'Мой календарь';
    default:
      return '';
  }
});

const userName = computed(() => {
  return authStore.user?.name ?? authStore.user?.login ?? 'Пользователь';
});

const handleLogout = async () => {
  authStore.clearAuth();

  await router.push('/login');
};
</script>

<template>
  <header class="PageHeader">
    <div class="PageHeaderTopRow">
      <div class="Date">
        Сегодня, {{ date }}
      </div>

      <Button @click="handleLogout">
        Выйти
      </Button>
    </div>

    <h1 class="Title">
      {{ title }}
    </h1>

    <p class="User">
      {{ userName }}
    </p>
  </header>
</template>

<style scoped lang="scss">
.PageHeader {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 24px;
}

.PageHeaderTopRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.Date {
  font-size: var(--fs-caption);
  color: var(--text-secondary);
}

.Title {
  font-size: var(--fs-display);
  line-height: var(--lh-display);
  font-weight: var(--fw-semibold);
  margin: 0;
}

.Subtitle {
  margin: 0;
  color: var(--text-secondary);
}

.User {
  margin: 4px 0 0;
  font-size: var(--fs-caption);
  color: var(--text-tertiary);
}

@media (max-width: 480px) {
  .PageHeaderTopRow {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
