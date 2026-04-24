import { Capacitor } from '@capacitor/core';
import {
  type LocalNotificationSchema,
  LocalNotifications,
} from '@capacitor/local-notifications';

import type { Router } from 'vue-router';

import type { Reminder } from '@/@types';

const REMINDERS_CHANNEL_ID = 'reminders';

const isNativeNotificationsSupported = () => {
  return Capacitor.isNativePlatform();
};

const isAndroidPlatform = () => {
  return Capacitor.getPlatform() === 'android';
};

const getReminderNotificationId = (reminderId: string): number => {
  let hash = 0;

  for (let i = 0; i < reminderId.length; i += 1) {
    hash = (hash << 5) - hash + reminderId.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash) || 1;
};

const getReminderNotificationDate = (reminder: Reminder): Date => {
  const minutesBefore = Math.max(0, reminder.notifications.minutesBefore);
  const timestamp = reminder.dateTime.getTime() - minutesBefore * 60 * 1000;

  const date = new Date(timestamp);

  if (date.getTime() <= Date.now()) {
    return new Date(Date.now() + 3000);
  }

  return date;
};

const isReminderNotificationRelevant = (reminder: Reminder): boolean => {
  return reminder.dateTime.getTime() > Date.now();
};

const cancelNotificationById = async (notificationId: number) => {
  await LocalNotifications.cancel({
    notifications: [{ id: notificationId }],
  });
};

const getPendingNotificationIds = async () => {
  const pending = await LocalNotifications.getPending();

  return pending.notifications.map((notification) => ({
    id: notification.id,
  }));
};

const ensureExactNotificationsPermission = async (): Promise<boolean> => {
  if (!isNativeNotificationsSupported() || !isAndroidPlatform()) {
    return true;
  }

  const exact = await LocalNotifications.checkExactNotificationSetting();

  if (exact.exact_alarm === 'granted') {
    return true;
  }

  await LocalNotifications.changeExactNotificationSetting();

  const updatedExact = await LocalNotifications.checkExactNotificationSetting();

  return updatedExact.exact_alarm === 'granted';
};

const buildReminderNotification = (
  reminder: Reminder,
  useExactAlarm: boolean,
): LocalNotificationSchema => {
  const notificationDate = getReminderNotificationDate(reminder);

  return {
    id: getReminderNotificationId(reminder.id),
    title: reminder.name || 'Напоминание',
    body: reminder.description || 'Пора проверить напоминание',
    schedule: {
      at: notificationDate,
      allowWhileIdle: useExactAlarm,
    },
    channelId: REMINDERS_CHANNEL_ID,
    extra: {
      reminderId: reminder.id,
    },
  };
};

export const initReminderNotifications = async (router: Router) => {
  if (!isNativeNotificationsSupported()) {
    return;
  }

  if (isAndroidPlatform()) {
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
    (event) => {
      void (async () => {
        try {
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
        } catch (error) {
          console.error('Notification click handling failed', error);
        }
      })();
    },
  );
};

export const ensureReminderNotificationsPermission =
  async (): Promise<boolean> => {
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

  await cancelNotificationById(notificationId);

  if (!isReminderNotificationRelevant(reminder)) {
    return;
  }

  const hasExactAlarmPermission = await ensureExactNotificationsPermission();

  await LocalNotifications.schedule({
    notifications: [
      buildReminderNotification(reminder, hasExactAlarmPermission),
    ],
  });

  const pending = await LocalNotifications.getPending();
  console.log('pending after schedule', pending.notifications);
};

export const removeReminderNotification = async (reminderId: string) => {
  if (!isNativeNotificationsSupported()) {
    return;
  }

  await cancelNotificationById(getReminderNotificationId(reminderId));
};

export const syncAllReminderNotifications = async (reminders: Reminder[]) => {
  if (!isNativeNotificationsSupported()) {
    return;
  }

  const permissions = await LocalNotifications.checkPermissions();

  if (permissions.display !== 'granted') {
    return;
  }

  const pendingNotificationIds = await getPendingNotificationIds();

  if (pendingNotificationIds.length) {
    await LocalNotifications.cancel({
      notifications: pendingNotificationIds,
    });
  }

  const hasExactAlarmPermission = await ensureExactNotificationsPermission();

  const notifications = reminders
    .filter(isReminderNotificationRelevant)
    .map((reminder) =>
      buildReminderNotification(reminder, hasExactAlarmPermission),
    );

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

  const pendingNotificationIds = await getPendingNotificationIds();

  if (!pendingNotificationIds.length) {
    return;
  }

  await LocalNotifications.cancel({
    notifications: pendingNotificationIds,
  });
};
