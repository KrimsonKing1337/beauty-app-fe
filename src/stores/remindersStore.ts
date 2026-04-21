import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { Reminder } from '@/@types';

const createEmptyReminder = (): Reminder => {
  const now = new Date();

  now.setSeconds(0, 0);

  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    dateTime: now,
    repeat: {
      unit: 'day',
      interval: 0,
      daysOfWeek: [],
      preset: 'none',
    },
    notifications: {
      minutesBefore: 0,
    },
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const useRemindersStore = defineStore('reminders', () => {
  const editingReminderId = ref<string | null>(null);
  const draftReminder = ref<Reminder | null>(null);
  const lastTouchedReminderId = ref<string | null>(null);

  const startCreateReminder = () => {
    editingReminderId.value = null;
    draftReminder.value = createEmptyReminder();
  };

  const startEditReminder = (reminder: Reminder) => {
    editingReminderId.value = reminder.id;
    draftReminder.value = {
      ...reminder,
      dateTime: new Date(reminder.dateTime),
      repeat: {
        ...reminder.repeat,
        daysOfWeek: [...reminder.repeat.daysOfWeek],
      },
      notifications: {
        ...reminder.notifications,
      },
      createdAt: new Date(reminder.createdAt),
      updatedAt: new Date(reminder.updatedAt),
    };
  };

  const cancelEdit = () => {
    lastTouchedReminderId.value = editingReminderId.value;

    editingReminderId.value = null;
    draftReminder.value = null;
  };

  const clearDraft = () => {
    editingReminderId.value = null;
    draftReminder.value = null;
  };

  const setLastTouchedReminderId = (id: string | null) => {
    lastTouchedReminderId.value = id;
  };

  return {
    editingReminderId,
    draftReminder,
    lastTouchedReminderId,
    startCreateReminder,
    startEditReminder,
    cancelEdit,
    clearDraft,
    setLastTouchedReminderId,
  };
});
