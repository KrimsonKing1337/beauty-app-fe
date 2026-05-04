import { defineStore } from 'pinia';

type NotificationType = 'error' | 'success' | 'info';

type NotificationState = {
  isVisible: boolean;
  type: NotificationType;
  title: string;
  message: string;
};

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationState => ({
    isVisible: false,
    type: 'info',
    title: '',
    message: '',
  }),

  actions: {
    showError(message: string, title = 'Ошибка') {
      this.type = 'error';
      this.title = title;
      this.message = message;
      this.isVisible = true;
    },

    showSuccess(message: string, title = 'Готово') {
      this.type = 'success';
      this.title = title;
      this.message = message;
      this.isVisible = true;
    },

    close() {
      this.isVisible = false;
    },
  },
});
