export type RepeatPreset = 'none'
  | 'daily'
  | 'weekly'
  | 'daysOfWeek'
  | 'monthly'
  | 'yearly'
  | 'custom';

export type RepeatCustomUnit = 'day' | 'week' | 'month' | 'year';

export type ReminderRepeat = {
  preset: RepeatPreset;
  interval: number;
  unit: RepeatCustomUnit;
  daysOfWeek: number[];
};
