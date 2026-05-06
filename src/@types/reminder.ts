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
  daysBefore: number;
  hoursBefore: number;
  minutesBefore: number;
};

export type Reminder = {
  id: string;
  name: string;
  description: string;
  dateTime: Date;
  repeat: ReminderRepeat;
  notifications: ReminderNotifications;
  procedureId: string | null;
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
  notifications: Partial<ReminderNotifications>;
  procedureId: string | null;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ReminderSortBy =
  | 'dateTime'
  | 'createdAt'
  | 'updatedAt'
  | 'name';

export type ReminderSortOrder = 'asc' | 'desc';

export type RemindersQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: ReminderSortBy;
  sortOrder?: ReminderSortOrder;
  search?: string;
  isCompleted?: boolean | null;
  procedureId?: string | null;
  includeProcedureReminders?: boolean;
  dateFrom?: string;
  dateTo?: string;
};

export type ReminderPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedRemindersResponse = {
  items: Reminder[];
  pagination: ReminderPagination;
};

export type CreateReminderPayload = {
  name: string;
  description: string;
  dateTime: Date;
  repeat: ReminderRepeat;
  notifications: ReminderNotifications;
  procedureId?: string | null;
  isCompleted?: boolean;
};

export type UpdateReminderPayload = {
  name?: string;
  description?: string;
  dateTime?: Date;
  repeat?: ReminderRepeat;
  notifications?: ReminderNotifications;
  procedureId?: string | null;
  isCompleted?: boolean;
};
