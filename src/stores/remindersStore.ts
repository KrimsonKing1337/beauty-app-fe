import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { ReminderRepeat } from '@/components/Reminders/@types.ts';

export type ReminderNotifications = {
  minutesBefore: number;
};

export type Reminder = {
  id: string;
  name: string;
  description: string;
  dateTime: Date;
  repeat: ReminderRepeat;
  notifications: ReminderNotifications;
  isCompleted: boolean;
};

const createEmptyReminder = (): Reminder => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  dateTime: new Date(),
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
});

const shiftDate = (base: Date, days: number) => {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
};

const todayDate = new Date();

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
    draftReminder.value = { ...reminder };
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
