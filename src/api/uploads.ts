import { apiClient } from '@/api/client.ts';

import { compressImage } from '@/utils/compressImage.ts';

export type UploadFileArgs = {
  file: File;
  procedureId: string | null;
  type: 'before' | 'after';
};

export const uploadFile = async ({
  file,
  procedureId,
  type,
}: UploadFileArgs) => {
  if (!procedureId) {
    throw new Error('procedureId is required for image upload');
  }

  const compressedFile = await compressImage(file);

  const formData = new FormData();

  formData.append('files', compressedFile);

  return apiClient(`/uploads/${procedureId}/${type}`, {
    method: 'POST',
    body: formData,
  });
};
