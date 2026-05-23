import type { Procedure, ProcedureImage } from '@/@types';

import { apiClient } from '@/api/client.ts';

import { compressImage } from '@/utils/compressImage.ts';

export type UploadImagesArgs = {
  files: File[];
  labels?: string[];
  procedureId: string | null;
};

type UploadImagesResponse = Procedure | ProcedureImage[] | {
  images: ProcedureImage[];
};

const mapUploadImagesResponse = (
  response: UploadImagesResponse,
): ProcedureImage[] => {
  if (Array.isArray(response)) {
    return response;
  }

  return response.images;
};

export const uploadImages = async ({
  files,
  labels = [],
  procedureId,
}: UploadImagesArgs): Promise<ProcedureImage[]> => {
  if (!procedureId) {
    throw new Error('procedureId is required for image upload');
  }

  if (!files.length) {
    return [];
  }

  const compressedFiles = await Promise.all(files.map(compressImage));

  const formData = new FormData();

  compressedFiles.forEach((file) => {
    formData.append('files', file);
  });

  formData.append(
    'labels',
    JSON.stringify(labels.map((label) => label.trim())),
  );

  const response = await apiClient<UploadImagesResponse>(
    `/uploads/${procedureId}`,
    {
      method: 'POST',
      body: formData,
    },
  );

  return mapUploadImagesResponse(response);
};
