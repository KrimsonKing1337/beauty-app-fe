import { Capacitor } from '@capacitor/core';
import { type LocalNotificationSchema, LocalNotifications } from '@capacitor/local-notifications';

import type { Router } from 'vue-router';

import type { Reminder } from '@/@types';

const REMINDERS_CHANNEL_ID = 'reminders';

const isNativeNotificationsSupported = () => {
  return Capacitor.isNativePlatform();
};

const getReminderNotificationId = (reminderId: string): number => {
  let hash = 0;

  for (let i = 0; i < reminderId.length; i += 1) {
    hash = ((hash << 5) - hash) + reminderId.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash) || 1;
};

const getReminderNotificationDate = (reminder: Reminder): Date => {
  const minutesBefore = Math.max(0, reminder.notifications.minutesBefore);
  const timestamp = reminder.dateTime.getTime() - (minutesBefore * 60 * 1000);

  return new Date(timestamp);
};

const buildReminderNotification = (reminder: Reminder): LocalNotificationSchema => {
  const notificationDate = getReminderNotificationDate(reminder);

  return {
    id: getReminderNotificationId(reminder.id),
    title: reminder.name || 'Напоминание',
    body: reminder.description || 'Пора проверить напоминание',
    schedule: {
      at: notificationDate,
      allowWhileIdle: true,
    },
    channelId: REMINDERS_CHANNEL_ID,
    extra: {
      reminderId: reminder.id,
    },
  };
};

const isReminderNotificationRelevant = (reminder: Reminder): boolean => {
  if (reminder.isCompleted) {
    return false;
  }

  const notificationDate = getReminderNotificationDate(reminder);

  return notificationDate.getTime() > Date.now();
};

export const initReminderNotifications = async (router: Router) => {
  if (!isNativeNotificationsSupported()) {
    return;
  }

  if (Capacitor.getPlatform() === 'android') {
    await LocalNotifications.createChannel({
      id: REMINDERS_CHANNEL_ID,
      name: 'Напоминания',
      description: 'Уведомления о напоминаниях',
      importance: 5,
      visibility: 1,
    });
  }

  await LocalNotifications.removeAllListeners();

  await LocalNotifications.addListener(
    'localNotificationActionPerformed',
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async (event) => {
      const reminderId = event.notification.extra?.reminderId;

      if (typeof reminderId !== 'string') {
        return;
      }

      await router.push({
        path: '/reminders',
        query: {
          scrollTo: reminderId,
        },
      });
    },
  );
};

export const ensureReminderNotificationsPermission = async (): Promise<boolean> => {
  if (!isNativeNotificationsSupported()) {
    return false;
  }

  const permissions = await LocalNotifications.checkPermissions();

  if (permissions.display === 'granted') {
    return true;
  }

  const requested = await LocalNotifications.requestPermissions();

  return requested.display === 'granted';
};

export const syncReminderNotification = async (reminder: Reminder) => {
  if (!isNativeNotificationsSupported()) {
    return;
  }

  const notificationId = getReminderNotificationId(reminder.id);

  await LocalNotifications.cancel({
    notifications: [{ id: notificationId }],
  });

  if (!isReminderNotificationRelevant(reminder)) {
    return;
  }

  await LocalNotifications.schedule({
    notifications: [buildReminderNotification(reminder)],
  });
};

export const removeReminderNotification = async (reminderId: string) => {
  if (!isNativeNotificationsSupported()) {
    return;
  }

  await LocalNotifications.cancel({
    notifications: [{ id: getReminderNotificationId(reminderId) }],
  });
};

export const syncAllReminderNotifications = async (reminders: Reminder[]) => {
  if (!isNativeNotificationsSupported()) {
    return;
  }

  const permissions = await LocalNotifications.checkPermissions();

  if (permissions.display !== 'granted') {
    return;
  }

  const pending = await LocalNotifications.getPending();

  if (pending.notifications.length) {
    await LocalNotifications.cancel({
      notifications: pending.notifications.map((notification) => ({
        id: notification.id,
      })),
    });
  }

  const notifications = reminders
    .filter(isReminderNotificationRelevant)
    .map(buildReminderNotification);

  if (!notifications.length) {
    return;
  }

  await LocalNotifications.schedule({
    notifications,
  });
};

export const clearAllReminderNotifications = async () => {
  if (!isNativeNotificationsSupported()) {
    return;
  }

  const pending = await LocalNotifications.getPending();

  if (!pending.notifications.length) {
    return;
  }

  await LocalNotifications.cancel({
    notifications: pending.notifications.map((notification) => ({
      id: notification.id,
    })),
  });
};
