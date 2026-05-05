import type {
  Procedure,
  ProcedureDto,
  CreateProcedurePayload,
  UpdateProcedurePayload,
} from '@/@types';

import { apiClient } from './client';

export const mapProcedureDtoToModel = (dto: ProcedureDto): Procedure => ({
  id: dto.id,
  procedureName: dto.procedureName,
  dateTime: new Date(dto.dateTime),
  place: dto.place,
  durationHours: dto.durationHours,
  durationMinutes: dto.durationMinutes,
  price: dto.price,
  beforeImagePaths: dto.beforeImagePaths,
  afterImagePaths: dto.afterImagePaths,
  notes: dto.notes,
  typeId: dto.typeId,
  tagIds: dto.tagIds ?? [],
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});

const mapCreateProcedurePayloadToDto = (
  payload: CreateProcedurePayload,
) => ({
  ...payload,
  dateTime: payload.dateTime.toISOString(),
});

const mapUpdateProcedurePayloadToDto = (
  payload: UpdateProcedurePayload,
) => ({
  ...payload,
  dateTime: payload.dateTime?.toISOString(),
});

export const getProcedures = async (): Promise<Procedure[]> => {
  const data = await apiClient<ProcedureDto[]>('/procedures');

  return data.map(mapProcedureDtoToModel);
};

export const createProcedure = async (
  payload: CreateProcedurePayload,
): Promise<Procedure> => {
  const data = await apiClient<ProcedureDto>('/procedures', {
    method: 'POST',
    body: JSON.stringify(mapCreateProcedurePayloadToDto(payload)),
  });

  return mapProcedureDtoToModel(data);
};

export const updateProcedure = async (
  payload: UpdateProcedurePayload,
): Promise<Procedure> => {
  const data = await apiClient<ProcedureDto>(`/procedures/${payload.id}`, {
    method: 'PATCH',
    body: JSON.stringify(mapUpdateProcedurePayloadToDto(payload)),
  });

  return mapProcedureDtoToModel(data);
};

export const deleteProcedure = async (id: string): Promise<{ id: string }> => {
  return apiClient<{ id: string }>(`/procedures/${id}`, {
    method: 'DELETE',
  });
};
