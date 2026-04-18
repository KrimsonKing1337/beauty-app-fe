import { createApp } from 'vue';

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import VCalendar from 'v-calendar';

import { createPinia } from 'pinia';

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

import PrimeVue from 'primevue/config';

import App from './App.vue';
import router from './router';

import 'reset-css/reset.css';
import 'primeicons/primeicons.css';
import 'v-calendar/style.css';

import './styles/styles.scss';

const app = createApp(App);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fdf2f5',
      100: '#f9e3ea',
      200: '#f3c5d1',
      300: '#eda7b8',
      400: '#e789a0',
      500: '#d98ea1',
      600: '#c97b90',
      700: '#a86374',
      800: '#874c58',
      900: '#66363c',
    },
  },
});

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: false,
    },
  },
});

app.use(VueQueryPlugin, {
  queryClient,
});

app.use(VCalendar, {});
app.use(createPinia());
app.use(router);

app.mount('#app');
