import type { CreateProcedureTypePayload, ProcedureType, ProcedureTypeDto } from '@/@types';

import { apiClient } from '@/api/client.ts';

const mapProcedureTypeDtoToEntity = (dto: ProcedureTypeDto): ProcedureType => ({
  ...dto,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});

export const getProcedureTypes = async (): Promise<ProcedureType[]> => {
  const data = await apiClient<ProcedureTypeDto[]>('/procedure-types');

  return data.map(mapProcedureTypeDtoToEntity);
};

export const createProcedureType = async (payload: CreateProcedureTypePayload): Promise<ProcedureType> => {
  const data = await apiClient<ProcedureTypeDto>('/procedure-types', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return mapProcedureTypeDtoToEntity(data);
};

export const deleteProcedureType = async (id: string): Promise<{ id: string }> => {
  return apiClient<{ id: string }>(`/procedure-types/${id}`, {
    method: 'DELETE',
  });
};
