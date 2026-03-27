import type { ReminderRepeat, RepeatPreset } from '../@types.ts';

export const formatReminderDate = (date: Date) => {
  const now = new Date();

  const diffMs = date.getTime() - now.getTime();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  const isPast = diffMs < 0;

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

  const today = new Date();
  const target = new Date(date);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const dayDiff = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
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

  if (!isPast) {
    if (diffMinutes < 60) {
      relativeText = `через ${diffMinutes} мин`;
    } else if (diffHours < 24) {
      relativeText = `через ${diffHours} ч`;
    } else if (diffDays < 7) {
      relativeText = `через ${diffDays} д`;
    }
  } else {
    const absMinutes = Math.abs(diffMinutes);
    const absHours = Math.abs(diffHours);
    const absDays = Math.abs(diffDays);

    if (absMinutes === 0) {
      relativeText = 'сейчас';
    } else if (absMinutes < 60) {
      relativeText = `просрочено на ${absMinutes} мин`;
    } else if (absHours < 24) {
      relativeText = `просрочено на ${absHours} ч`;
    } else {
      relativeText = `просрочено на ${absDays} д`;
    }
  }

  return {
    main: `${mainText}, ${formatTime(date)}`,
    relative: relativeText,
    isPast,
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
      return 'Пользовательское';
    default:
      return '';
  }
};

export const repeatStoreToUi = (repeat: ReminderRepeat) => {
  return {
    repeat: repeat.preset,
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
