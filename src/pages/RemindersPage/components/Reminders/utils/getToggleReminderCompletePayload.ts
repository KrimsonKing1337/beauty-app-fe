import type { UpdateReminderPayload } from '@/@types';
import { type Reminder } from '@/stores/remindersStore.ts';

const DAYS_IN_WEEK = 7;
const MIN_REPEAT_INTERVAL = 1;

const toDate = (value: Date): Date => new Date(value);

const addDays = (date: Date, amount: number): Date => {
  const next = new Date(date);

  next.setDate(next.getDate() + amount);

  return next;
};

const addWeeks = (date: Date, amount: number): Date => {
  return addDays(date, amount * DAYS_IN_WEEK);
};

const addMonths = (date: Date, amount: number): Date => {
  const next = new Date(date);

  next.setMonth(next.getMonth() + amount);

  return next;
};

const addYears = (date: Date, amount: number): Date => {
  const next = new Date(date);

  next.setFullYear(next.getFullYear() + amount);

  return next;
};

const getMondayFirstDay = (date: Date): number => {
  const day = date.getDay();

  return day === 0 ? 7 : day;
};

const sortDaysOfWeek = (daysOfWeek: number[]): number[] => {
  return [...daysOfWeek].sort((a, b) => a - b);
};

const getSafeInterval = (interval: number): number => {
  return Math.max(MIN_REPEAT_INTERVAL, interval);
};

const getNextByPresetStep = (date: Date, reminder: Reminder): Date => {
  const interval = getSafeInterval(reminder.repeat.interval);

  switch (reminder.repeat.preset) {
    case 'daily':
      return addDays(date, 1);

    case 'weekly':
      return addWeeks(date, 1);

    case 'monthly':
      return addMonths(date, 1);

    case 'yearly':
      return addYears(date, 1);

    case 'custom': {
      switch (reminder.repeat.unit) {
        case 'day':
          return addDays(date, interval);

        case 'week':
          return addWeeks(date, interval);

        case 'month':
          return addMonths(date, interval);

        case 'year':
          return addYears(date, interval);
      }
    }

    case 'daysOfWeek': {
      const sortedDays = sortDaysOfWeek(reminder.repeat.daysOfWeek);

      if (sortedDays.length === 0) {
        return addWeeks(date, 1);
      }

      const currentDay = getMondayFirstDay(date);
      const nextDay = sortedDays.find((day) => day > currentDay);

      if (nextDay) {
        return addDays(date, nextDay - currentDay);
      }

      return addDays(date, DAYS_IN_WEEK - currentDay + sortedDays[0]!);
    }

    case 'none':
    default:
      return date;
  }
};

const getNextFutureOccurrence = (reminder: Reminder): Date => {
  const now = new Date();
  let nextDate = toDate(reminder.dateTime);

  nextDate = getNextByPresetStep(nextDate, reminder);

  while (nextDate <= now) {
    nextDate = getNextByPresetStep(nextDate, reminder);
  }

  return nextDate;
};

const getCompleteReminderPayload = (
  reminder: Reminder,
): UpdateReminderPayload => {
  if (reminder.repeat.preset === 'none') {
    return {
      isCompleted: true,
    };
  }

  return {
    dateTime: getNextFutureOccurrence(reminder),
    isCompleted: false,
  };
};

const getUncompletedReminderPayload = (): UpdateReminderPayload => {
  return {
    isCompleted: false,
  };
};

export const getToggleReminderCompletePayload = (
  reminder: Reminder,
): UpdateReminderPayload => {
  if (reminder.isCompleted) {
    return getUncompletedReminderPayload();
  }

  return getCompleteReminderPayload(reminder);
};
