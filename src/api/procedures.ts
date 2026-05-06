import type {
  Procedure,
  ProcedureDto,
  CreateProcedurePayload,
  UpdateProcedurePayload,
  ProceduresQueryParams,
  PaginatedResponse,
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

const buildQueryString = (params: ProceduresQueryParams = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(key, item);
      });

      return;
    }

    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();

  return queryString ? `?${queryString}` : '';
};

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

export const getProceduresPage = async (
  params: ProceduresQueryParams = {},
): Promise<PaginatedResponse<Procedure>> => {
  const data = await apiClient<PaginatedResponse<ProcedureDto>>(
    `/procedures${buildQueryString(params)}`,
  );

  return {
    items: data.items.map(mapProcedureDtoToModel),
    pagination: data.pagination,
  };
};

export const getProcedures = async (
  params: ProceduresQueryParams = {},
): Promise<Procedure[]> => {
  const data = await getProceduresPage({
    limit: 100,
    ...params,
  });

  return data.items;
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
