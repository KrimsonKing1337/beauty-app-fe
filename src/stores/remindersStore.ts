import { ref } from 'vue'
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

  const editingReminderId = ref<string | null>(null);
  const draftReminder = ref<Reminder | null>(null);
  const lastTouchedReminderId = ref<string | null>(null);

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
  };
});
