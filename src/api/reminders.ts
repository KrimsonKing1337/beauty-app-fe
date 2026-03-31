import type {
  Reminder,
  ReminderDto,
  CreateReminderPayload,
  UpdateReminderPayload,
} from '@/@types';

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
  const response = await fetch(REMINDERS_API_PATH);

  const data = await checkResponse<ReminderDto[]>(response);

  return data.map(mapReminderDtoToEntity);
};

export const getReminderById =
  async (id: string): Promise<Reminder> => {
  const response = await fetch(`${REMINDERS_API_PATH}/${id}`);

  const data = await checkResponse<ReminderDto>(response);

  return mapReminderDtoToEntity(data);
};

export const createReminder = async (
  payload: CreateReminderPayload,
): Promise<Reminder> => {
  const response = await fetch(REMINDERS_API_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapCreateReminderPayloadToDto(payload)),
  });

  const data = await checkResponse<ReminderDto>(response);

  return mapReminderDtoToEntity(data);
};

export const updateReminder = async (
  id: string,
  payload: UpdateReminderPayload,
): Promise<Reminder> => {
  const response = await fetch(`${REMINDERS_API_PATH}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapUpdateReminderPayloadToDto(payload)),
  });

  const data = await checkResponse<ReminderDto>(response);

  return mapReminderDtoToEntity(data);
};

export const deleteReminder = async (id: string): Promise<void> => {
  const response = await fetch(`${REMINDERS_API_PATH}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.message ?? `Request failed with status ${response.status}`,
    );
  }
};
