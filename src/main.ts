import { createApp } from 'vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createPinia } from 'pinia';

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

import { initReminderNotifications } from '@/utils/reminderNotifications';

import App from './App.vue';
import router from './router';

import 'vuetify/styles';
import 'vuetify/styles/colors';
import 'vuetify/styles/utilities';
import '@mdi/font/css/materialdesignicons.css';

import './styles/styles.scss';

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

app.use(VueQueryPlugin, {
  queryClient,
});

app.use(vuetify);
app.use(createPinia());
app.use(router);

initReminderNotifications(router);

app.mount('#app');
