import { apiClient } from './client';
import { mapProcedureDtoToModel } from '@/utils';

export type ProcedureDto = {
  id: string;
  procedureName: string;
  date: Date;
  place: string | undefined;
  duration: string | undefined;
  price: number | undefined;
  beforeAfter: string[];
  notes: string | undefined;
  createdAt: string;
  updatedAt: string;
};

export type CreateProcedurePayload = Omit<ProcedureDto, 'id' | 'createdAt'>;
export type UpdateProcedurePayload = Omit<ProcedureDto, 'createdAt'>;

export const getProcedures = async (): Promise<ProcedureDto[]> => {
  const data = await apiClient<ProcedureDto[]>('/api/procedures');

  return data.map(mapProcedureDtoToModel);
};

export const createProcedure = async (
  payload: CreateProcedurePayload,
): Promise<ProcedureDto> => {
  return apiClient<ProcedureDto>('/api/procedures', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const updateProcedure = async (
  payload: UpdateProcedurePayload,
): Promise<ProcedureDto> => {
  return apiClient<ProcedureDto>(`/api/procedures/${payload.id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
};

export const deleteProcedure = async (id: string): Promise<{ id: string }> => {
  return apiClient<{ id: string }>(`/api/procedures/${id}`, {
    method: 'DELETE',
  });
};
