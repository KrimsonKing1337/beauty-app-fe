import { createApp } from 'vue';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createPinia } from 'pinia';

import {
  VueQueryPlugin,
  QueryClient,
  MutationCache,
} from '@tanstack/vue-query';

import { getErrorMessage } from '@/api/errors';

import { useNotificationStore } from '@/stores/notificationStore';

import { initReminderNotifications } from '@/utils/reminderNotifications';

import App from './App.vue';
import router from './router';

import 'vuetify/styles';
import 'vuetify/styles/colors';
import 'vuetify/styles/utilities';
import '@mdi/font/css/materialdesignicons.css';

import './styles/styles.scss';

const app = createApp(App);
const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
  },
});

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      const meta = mutation.options.meta as {
        showGlobalError?: boolean;
      } | undefined;

      if (meta?.showGlobalError === false) {
        return;
      }

      const notificationStore = useNotificationStore();

      notificationStore.showError(getErrorMessage(error));
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

app.use(pinia);

app.use(VueQueryPlugin, {
  queryClient,
});

app.use(vuetify);
app.use(router);

initReminderNotifications(router);

app.mount('#app');
