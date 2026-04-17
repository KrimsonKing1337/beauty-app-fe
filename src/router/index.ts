import { createRouter, createWebHistory } from 'vue-router';

import { Main, Auth } from '@/pages';
import { useAuthStore } from '@/stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Auth,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/reminders',
      name: 'reminders',
      component: Main,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Main,
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
