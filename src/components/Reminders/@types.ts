export type RepeatPreset = 'none' | 'daily' | 'weekly' | 'daysOfWeek' | 'monthly' | 'yearly' | 'custom';

export type RepeatNormalized = {
  interval: number;
  unitOrNone: 'none' | 'day' | 'week' | 'month' | 'year';
};
