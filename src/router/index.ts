import { createRouter, createWebHistory } from 'vue-router';

import { MainPage, AuthPage } from '@/pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/login',
      name: 'login',
      component: AuthPage,
    },
    {
      path: '/',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/reminders',
      name: 'reminders',
      component: MainPage,
    },
  ],
});

export default router;
