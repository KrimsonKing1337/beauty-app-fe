import type { RepeatCustomUnit } from '@/pages/RemindersPage/components/Reminders/@types.ts';

export type RepeatPreset = 'none'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'daysOfWeek'
  | 'custom';

export type ReminderRepeat = {
  unit: RepeatCustomUnit;
  interval: number;
  daysOfWeek: number[];
  preset: RepeatPreset;
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

export type AuthUser = {
  id: string;
  login: string;
  name: string;
};

export type LoginPayload = {
  login: string;
  password: string;
};
