export type RepeatPreset =
  | 'none'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'daysOfWeek'
  | 'custom';

export type RepeatCustomUnit = 'day' | 'week' | 'month' | 'year';

export type ReminderRepeat = {
  preset: RepeatPreset;
  interval: number;
  unit: RepeatCustomUnit;
  daysOfWeek: number[];
};

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
  createdAt: Date;
  updatedAt: Date;
};

export type ReminderDto = {
  id: string;
  name: string;
  description: string;
  dateTime: string;
  repeat: ReminderRepeat;
  notifications: ReminderNotifications;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateReminderPayload = {
  name: string;
  description: string;
  dateTime: Date;
  repeat: ReminderRepeat;
  notifications: ReminderNotifications;
  isCompleted?: boolean;
};

export type UpdateReminderPayload = {
  name?: string;
  description?: string;
  dateTime?: Date;
  repeat?: ReminderRepeat;
  notifications?: ReminderNotifications;
  isCompleted?: boolean;
};
