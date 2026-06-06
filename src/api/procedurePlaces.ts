import type { CreateProcedurePlacePayload, ProcedurePlace, ProcedurePlaceDto } from '@/@types';

import { apiClient } from '@/api/client.ts';

const mapProcedurePlaceDtoToEntity = (dto: ProcedurePlaceDto): ProcedurePlace => ({
  ...dto,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});

export const getProcedurePlaces = async (): Promise<ProcedurePlace[]> => {
  const data = await apiClient<ProcedurePlaceDto[]>('/procedure-places');

  return data.map(mapProcedurePlaceDtoToEntity);
};

export const createProcedurePlace = async (payload: CreateProcedurePlacePayload): Promise<ProcedurePlace> => {
  const data = await apiClient<ProcedurePlaceDto>('/procedure-places', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return mapProcedurePlaceDtoToEntity(data);
};

export const deleteProcedurePlace = async (id: string): Promise<{ id: string }> => {
  return apiClient<{ id: string }>(`/procedure-places/${id}`, {
    method: 'DELETE',
  });
};
