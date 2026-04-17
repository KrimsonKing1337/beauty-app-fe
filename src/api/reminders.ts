import type {
  Reminder,
  ReminderDto,
  CreateReminderPayload,
  UpdateReminderPayload,
} from '@/@types';

import { apiClient } from '@/api/client.ts';

const mapReminderDtoToEntity = (dto: ReminderDto): Reminder => ({
  ...dto,
  dateTime: new Date(dto.dateTime),
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});

const mapCreateReminderPayloadToDto = (
  payload: CreateReminderPayload,
) => ({
  ...payload,
  dateTime: payload.dateTime.toISOString(),
});

const mapUpdateReminderPayloadToDto = (
  payload: UpdateReminderPayload,
) => ({
  ...payload,
  dateTime: payload.dateTime?.toISOString(),
});

export const getReminders = async (): Promise<Reminder[]> => {
  const data = await apiClient<ReminderDto[]>('/reminders');

  return data.map(mapReminderDtoToEntity);
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
    method: 'PUT',
    body: JSON.stringify(mapUpdateReminderPayloadToDto(payload)),
  });

  return mapReminderDtoToEntity(data);
};

export const deleteReminder = async (id: string): Promise<void> => {
  await apiClient<void>(`/reminders/${id}`, {
    method: 'DELETE',
  });
};
