import type {
  Reminder,
  ReminderDto,
  CreateReminderPayload,
  UpdateReminderPayload,
  RemindersQueryParams,
  PaginatedRemindersResponse,
} from '@/@types';

import { apiClient } from '@/api/client.ts';

import {
  normalizeReminderNotifications,
} from '@/pages/RemindersPage/components/Reminders/utils';

const mapReminderDtoToEntity = (dto: ReminderDto): Reminder => ({
  ...dto,
  dateTime: new Date(dto.dateTime),
  notifications: normalizeReminderNotifications(dto.notifications),
  procedureId: dto.procedureId ?? null,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});

const buildQueryString = (params: RemindersQueryParams = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : '';
};

const mapCreateReminderPayloadToDto = (
  payload: CreateReminderPayload,
) => ({
  ...payload,
  dateTime: payload.dateTime.toISOString(),
  notifications: normalizeReminderNotifications(payload.notifications),
  procedureId: payload.procedureId ?? null,
});

const mapUpdateReminderPayloadToDto = (
  payload: UpdateReminderPayload,
) => ({
  ...payload,
  dateTime: payload.dateTime?.toISOString(),
  notifications: payload.notifications
    ? normalizeReminderNotifications(payload.notifications)
    : undefined,
});

export const getRemindersPage = async (
  params: RemindersQueryParams = {},
): Promise<PaginatedRemindersResponse> => {
  const data = await apiClient<{
    items: ReminderDto[];
    pagination: PaginatedRemindersResponse['pagination'];
  }>(`/reminders${buildQueryString(params)}`);

  return {
    items: data.items.map(mapReminderDtoToEntity),
    pagination: data.pagination,
  };
};

export const getReminders = async (
  params: RemindersQueryParams = {},
): Promise<Reminder[]> => {
  const data = await getRemindersPage({
    limit: 100,
    ...params,
  });

  return data.items;
};

export const getReminderById = async (id: string): Promise<Reminder> => {
  const data = await apiClient<ReminderDto>(`/reminders/${id}`);

  return mapReminderDtoToEntity(data);
};

export const createReminder = async (
  payload: CreateReminderPayload,
): Promise<Reminder> => {
  const data = await apiClient<ReminderDto>('/reminders', {
    method: 'POST',
    body: JSON.stringify(mapCreateReminderPayloadToDto(payload)),
  });

  return mapReminderDtoToEntity(data);
};

export const updateReminder = async (
  id: string,
  payload: UpdateReminderPayload,
): Promise<Reminder> => {
  const data = await apiClient<ReminderDto>(`/reminders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(mapUpdateReminderPayloadToDto(payload)),
  });

  return mapReminderDtoToEntity(data);
};

export const deleteReminder = async (id: string): Promise<void> => {
  await apiClient<void>(`/reminders/${id}`, {
    method: 'DELETE',
  });
};
