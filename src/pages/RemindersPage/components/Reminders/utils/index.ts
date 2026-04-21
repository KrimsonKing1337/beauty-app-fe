import type { ReminderRepeat, RepeatPreset } from '@/@types';

export type FormatReminderDateArgs = {
  date: Date;
  currentNow?: Date;
  minutesBefore?: number;
};

export const formatReminderDate = ({
  date,
  currentNow,
  minutesBefore = 0,
}: FormatReminderDateArgs) => {
  const now = currentNow ?? new Date();
  const safeMinutesBefore = Math.max(0, minutesBefore);

  const notificationDate = new Date(
    date.getTime() - safeMinutesBefore * 60 * 1000,
  );

  const eventDiffMs = date.getTime() - now.getTime();
  const notificationDiffMs = notificationDate.getTime() - now.getTime();

  const diffMinutes = Math.floor(eventDiffMs / (1000 * 60));
  const diffHours = Math.floor(eventDiffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(eventDiffMs / (1000 * 60 * 60 * 24));

  const isPast = eventDiffMs < 0;
  const isTimeToNotify = notificationDiffMs <= 0 && !isPast;

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatDate = (d: Date) =>
    d.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    });

  const today = new Date(now);
  const target = new Date(date);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const dayDiff = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  let mainText = '';

  if (dayDiff === 0) {
    mainText = 'Сегодня';
  } else if (dayDiff === 1) {
    mainText = 'Завтра';
  } else if (dayDiff === -1) {
    mainText = 'Вчера';
  } else {
    mainText = formatDate(date);
  }

  let relativeText = '';

  if (isPast) {
    const absMinutes = Math.floor(Math.abs(eventDiffMs) / (1000 * 60));
    const absHours = Math.floor(Math.abs(eventDiffMs) / (1000 * 60 * 60));
    const absDays = Math.floor(Math.abs(eventDiffMs) / (1000 * 60 * 60 * 24));

    if (absMinutes < 1) {
      relativeText = 'сейчас';
    } else if (absMinutes < 60) {
      relativeText = `просрочено на ${absMinutes} мин`;
    } else if (absHours < 24) {
      relativeText = `просрочено на ${absHours} ч`;
    } else {
      relativeText = `просрочено на ${absDays} д`;
    }
  } else {
    if (diffMinutes < 1) {
      relativeText = 'меньше минуты';
    } else if (diffMinutes < 60) {
      relativeText = `через ${diffMinutes} мин`;
    } else if (diffHours < 24) {
      relativeText = `через ${diffHours} ч`;
    } else if (diffDays < 7) {
      relativeText = `через ${diffDays} д`;
    }
  }

  let due = '';

  if (isTimeToNotify || isPast) {
    due = isTimeToNotify ? 'isTimeToNotify' : 'isPast';
  }

  return {
    main: `${mainText}, ${formatTime(date)}`,
    relative: relativeText,
    due,
  };
};

export const getHumanReadableRepeatPreset = (type: RepeatPreset) => {
  switch (type) {
    case 'none':
      return '';
    case 'daily':
      return 'Ежедневно';
    case 'weekly':
      return 'Еженедельно';
    case 'monthly':
      return 'Ежемесячно';
    case 'yearly':
      return 'Ежемесячно';
    case 'daysOfWeek':
      return 'Дни недели';
    case 'custom':
      return 'Другое';
    default:
      return '';
  }
};

export const repeatStoreToUi = (repeat: ReminderRepeat) => {
  return {
    preset: repeat.preset,
    daysOfWeek: [...repeat.daysOfWeek],
    customInterval: repeat.interval,
    customUnit: repeat.unit,
  };
};

export type RepeatFormRef = {
  preset: RepeatPreset;
  daysOfWeek: number[];
  customInterval: number;
  customUnit: 'day' | 'week' | 'month' | 'year';
};

export const repeatUiToStore =
  (repeatFormRef: RepeatFormRef): ReminderRepeat => {
    const { preset, daysOfWeek, customUnit, customInterval } = repeatFormRef;

    const sortedDaysOfWeek = [...daysOfWeek]
      .sort((a, b) => a - b);

    switch (preset) {
      case 'none':
        return {
          preset: 'none',
          interval: 1,
          unit: 'day',
          daysOfWeek: [],
        };

      case 'daily':
        return {
          preset: 'daily',
          interval: 1,
          unit: 'day',
          daysOfWeek: [],
        };

      case 'weekly':
        return {
          preset: 'weekly',
          interval: 1,
          unit: 'week',
          daysOfWeek: [],
        };

      case 'daysOfWeek':
        return {
          preset: 'daysOfWeek',
          interval: 1,
          unit: 'week',
          daysOfWeek: sortedDaysOfWeek,
        };

      case 'monthly':
        return {
          preset: 'monthly',
          interval: 1,
          unit: 'month',
          daysOfWeek: [],
        };

      case 'yearly':
        return {
          preset: 'yearly',
          interval: 1,
          unit: 'year',
          daysOfWeek: [],
        };

      case 'custom':
        return {
          preset: 'custom',
          interval: customInterval,
          unit: customUnit,
          daysOfWeek: [],
        };
    }
  };

export { getToggleReminderCompletePayload } from './getToggleReminderCompletePayload';
