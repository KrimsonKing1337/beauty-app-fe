import type { ProcedureType, ProcedureTypeDto } from '@/@types';

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
