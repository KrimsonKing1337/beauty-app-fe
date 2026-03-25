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
  dateTime: Date;
  repeat: ReminderRepeat;
  notifications: {
    enabled: boolean;
    minutesBefore: number[];
  };
  isCompleted: boolean;
};

const createEmptyReminder = (): Reminder => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  dateTime: new Date(),
  repeat: {
    type: 'none',
  },
  notifications: {
    enabled: false,
    minutesBefore: [],
  },
  isCompleted: false,
});

const shiftDate = (base: Date, days: number) => {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
};

const todayDate = new Date();

const defaultReminders: Reminder[] = [
  {
    id: crypto.randomUUID(),
    name: 'Маникюр',
    description: 'Обновить гель-лак',
    dateTime: todayDate,
    repeat: {
      type: 'none',
    },
    notifications: {
      enabled: true,
      minutesBefore: [10, 60],
    },
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    name: 'Окрашивание волос',
    description: 'В салоне "Светлана"',
    dateTime: shiftDate(todayDate, 1),
    repeat: {
      type: 'monthly',
    },
    notifications: {
      enabled: true,
      minutesBefore: [10],
    },
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    name: 'Электроэпиляция',
    description: '',
    dateTime: shiftDate(todayDate, -1),
    repeat: {
      type: 'custom',
    },
    notifications: {
      enabled: false,
      minutesBefore: [10],
    },
    isCompleted: false,
  },
];

export const useRemindersStore = defineStore('reminders', () => {
  const reminders = ref<Reminder[]>(defaultReminders);

  const editingReminderId = ref<string | null>(null);
  const draftReminder = ref<Reminder | null>(null);
  const lastTouchedReminderId = ref<string | null>(null);

  const remindersSorted = computed(() => {
    return [...reminders.value].sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }

      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
    });
  });

  const addReminder = (payload?: Partial<Omit<Reminder, 'id'>>) => {
    const newReminder: Reminder = {
      ...createEmptyReminder(),
      ...payload,
    }

    reminders.value.push(newReminder);

    lastTouchedReminderId.value = newReminder.id;

    return newReminder;
  };

  const startCreateReminder = () => {
    editingReminderId.value = null;
    draftReminder.value = createEmptyReminder();
  };

  const startEditReminder = (id: string) => {
    const reminder = reminders.value.find((item) => item.id === id);

    if (!reminder) {
      return;
    }

    editingReminderId.value = id;
    draftReminder.value = { ...reminder };
  };

  const completeReminder = (id: string, value: boolean = true) => {
    const index = reminders.value.findIndex((r) => r.id === id);

    if (index === -1 || !reminders.value[index]) {
      return;
    }

    reminders.value[index].isCompleted = value;
  };

  const duplicateReminder = (id: string) => {
    const index = reminders.value.findIndex((r) => r.id === id);

    if (index === -1) {
      return;
    }

    const newId = crypto.randomUUID();

    const duplicatedCard = {
      ...reminders.value[index],
      id: newId,
    } as Reminder;

    reminders.value.splice(index, 0, duplicatedCard);
    lastTouchedReminderId.value = newId;

    startEditReminder(newId);
  };

  const cancelEdit = () => {
    lastTouchedReminderId.value = editingReminderId.value;

    editingReminderId.value = null;
    draftReminder.value = null;
  };

  const saveDraft = () => {
    if (!draftReminder.value) {
      return;
    }

    if (editingReminderId.value) {
      const index = reminders.value.findIndex((r) => r.id === editingReminderId.value);

      if (index === -1) {
        return;
      }

      reminders.value[index] = { ...draftReminder.value };
    } else {
      reminders.value.push({ ...draftReminder.value });
    }

    lastTouchedReminderId.value = draftReminder.value.id;

    editingReminderId.value = null;
    draftReminder.value = null;
  };

  const removeReminder = (id: string) => {
    const index = reminders.value.findIndex((r) => r.id === id);

    if (index === -1) {
      return;
    }

    const prevId = reminders.value[index - 1]?.id ?? null;
    const nextId = reminders.value[index + 1]?.id ?? null;

    reminders.value = reminders.value.filter((r) => r.id !== id);

    if (editingReminderId.value === id) {
      editingReminderId.value = null;
      draftReminder.value = null;
    }

    if (lastTouchedReminderId.value === id) {
      lastTouchedReminderId.value = nextId ?? prevId;
    }
  };

  return {
    reminders,
    remindersSorted,
    editingReminderId,
    draftReminder,
    lastTouchedReminderId,
    addReminder,
    startCreateReminder,
    startEditReminder,
    duplicateReminder,
    cancelEdit,
    saveDraft,
    removeReminder,
    completeReminder,
  };
});
