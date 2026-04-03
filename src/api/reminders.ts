import type {
  Reminder,
  ReminderDto,
  CreateReminderPayload,
  UpdateReminderPayload,
} from '@/@types';
import { apiClient } from '@/api/client.ts';

const REMINDERS_API_PATH = '/api/reminders';

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

const checkResponse =
  async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.message ?? `Request failed with status ${response.status}`,
    );
  }

  return response.json() as Promise<T>;
};

export const getReminders = async (): Promise<Reminder[]> => {
  const data = await apiClient<ReminderDto[]>(REMINDERS_API_PATH);

  return data.map(mapReminderDtoToEntity);
};

export const getReminderById =
  async (id: string): Promise<Reminder> => {
  const data = await apiClient<ReminderDto>(`${REMINDERS_API_PATH}/${id}`);

  return mapReminderDtoToEntity(data);
};

export const createReminder = async (
  payload: CreateReminderPayload,
): Promise<Reminder> => {
  const data = await apiClient<ReminderDto>(REMINDERS_API_PATH, {
    method: 'POST',
    body: JSON.stringify(mapCreateReminderPayloadToDto(payload)),
  });

  return mapReminderDtoToEntity(data);
};

export const updateReminder = async (
  id: string,
  payload: UpdateReminderPayload,
): Promise<Reminder> => {
  const data = await apiClient<ReminderDto>(`${REMINDERS_API_PATH}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(mapUpdateReminderPayloadToDto(payload)),
  });

  return mapReminderDtoToEntity(data);
};

export const deleteReminder = async (id: string): Promise<void> => {
  await apiClient<void>(`${REMINDERS_API_PATH}/${id}`, {
    method: 'DELETE',
  });
};
