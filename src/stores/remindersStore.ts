import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type ReminderRepeat = {
  type: 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';
  interval?: number;
  daysOfWeek?: number[];
  endDate?: string;
};

export type Reminder = {
  id: string;
  name: string;
  description: string;
  repeat: ReminderRepeat;
  notifications: {
    enabled: boolean;
    minutesBefore?: number[];
  };
  isCompleted: boolean;
  isArchived: boolean;
};

const createEmptyReminder = (): Reminder => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  repeat: {
    type: 'none',
  },
  notifications: {
    enabled: false,
  },
  isCompleted: false,
  isArchived: false,
});

const defaultReminders: Reminder[] = [
  {
    id: crypto.randomUUID(),
    name: 'Маникюр',
    description: 'Обновить гель-лак',
    repeat: {
      type: 'none',
    },
    notifications: {
      enabled: true,
      minutesBefore: [10, 60],
    },
    isCompleted: false,
    isArchived: false,
  },
  {
    id: crypto.randomUUID(),
    name: 'Окрашивание волос',
    description: 'В салоне "Светлана"',
    repeat: {
      type: 'monthly',
    },
    notifications: {
      enabled: true,
      minutesBefore: [10],
    },
    isCompleted: true,
    isArchived: false,
  },
  {
    id: crypto.randomUUID(),
    name: 'Электроэпиляция',
    description: '',
    repeat: {
      type: 'custom',
    },
    notifications: {
      enabled: false,
      minutesBefore: [10],
    },
    isCompleted: true,
    isArchived: true,
  },
];

export const useRemindersStore = defineStore('reminders', () => {
  const reminders = ref<Reminder[]>(defaultReminders);

  const addReminder = () => {
    const newReminder = createEmptyReminder();

    reminders.value.push(newReminder);
  };

  const updateReminder = (id: string, patch: Partial<Reminder>) => {
    const index = reminders.value.findIndex(r => r.id === id);
    if (index !== -1 && reminders.value[index]) {
      reminders.value[index] = {
        ...reminders.value[index],
        ...patch,
      };
    }
  };

  const deleteReminder = (id: string) => {
    reminders.value = reminders.value.filter(r => r.id !== id);
  };

  const toggleCompleted = (id: string) => {
    const r = reminders.value.find(r => r.id === id);

    if (r) {
      r.isCompleted = !r.isCompleted;
    }
  };

  return {
    reminders,
    addReminder,
    updateReminder,
    deleteReminder,
    toggleCompleted,
  };
});
