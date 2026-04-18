import type {
  Procedure,
  ProcedureDto,
  CreateProcedurePayload,
  UpdateProcedurePayload,
} from '@/@types';

import { mapProcedureDtoToModel } from '@/utils';

import { apiClient } from './client';

const mapCreateProcedurePayloadToDto = (
  payload: CreateProcedurePayload,
) => ({
  ...payload,
  date: payload.date.toISOString(),
});

const mapUpdateProcedurePayloadToDto = (
  payload: UpdateProcedurePayload,
) => ({
  ...payload,
  date: payload.date?.toISOString(),
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
