import { createRouter, createWebHistory } from 'vue-router';

import { MainPage, AuthPage } from '@/pages';
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: AuthPage,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/',
      name: 'main',
      component: MainPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/reminders',
      name: 'reminders',
      component: MainPage,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' };
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'main' };
  }

  return true;
});

export default router;
