import { apiClient } from './client';

export type ProcedureDto = {
  id: string;
  procedureName: string;
  date: string | null;
  place: string | null;
  duration: string | null;
  price: number | null;
  beforeAfter: string[];
  notes: string | null;
  createdAt?: string;
};

export type CreateProcedurePayload = Omit<ProcedureDto, 'id' | 'createdAt'>;
export type UpdateProcedurePayload = Omit<ProcedureDto, 'createdAt'>;

export const getProcedures = async (): Promise<ProcedureDto[]> => {
  return apiClient<ProcedureDto[]>('/api/procedures');
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
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};

export const deleteProcedure = async (id: string): Promise<{ id: string }> => {
  return apiClient<{ id: string }>(`/api/procedures/${id}`, {
    method: 'DELETE',
  });
};
