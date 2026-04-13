import type { RepeatCustomUnit } from '@/components/Reminders/@types.ts';

type Product = {
  id: string;
  name: string;
  price: number;
}

type Procedure = {
  id: string;
  title: string;
  category: 'face' | 'body' | 'hair' | 'nails' | 'other';
  date: string;
  duration?: number;

  price?: number;
  location?: 'home' | 'salon' | 'other';
  master?: string;

  notes?: string;

  images?: {
    before?: string[];
    after?: string[];
  }

  products?: Product[];

  rating?: number;
  feeling?: 'bad' | 'neutral' | 'good' | 'excellent';

  repeat?: {
    intervalDays: number;
    nextDate?: string;
  }
}

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

export type LoginResponseDto = {
  accessToken: string;
  user: AuthUser;
};

export type MeResponseDto = {
  user: AuthUser;
};
