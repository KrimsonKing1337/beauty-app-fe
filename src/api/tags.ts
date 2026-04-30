import type { CreateTagPayload, Tag, TagDto } from '@/@types';

import { apiClient } from '@/api/client.ts';

const mapTagDtoToEntity = (dto: TagDto): Tag => ({
  ...dto,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});

export const getTags = async (): Promise<Tag[]> => {
  const data = await apiClient<TagDto[]>('/tags');

  return data.map(mapTagDtoToEntity);
};

export const createTag = async (payload: CreateTagPayload): Promise<Tag> => {
  const data = await apiClient<TagDto>('/tags', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return mapTagDtoToEntity(data);
};

export const deleteTag = async (id: string): Promise<{ id: string }> => {
  return apiClient<{ id: string }>(`/tags/${id}`, {
    method: 'DELETE',
  });
};
