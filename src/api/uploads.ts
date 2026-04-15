import { apiClient } from '@/api/client.ts';

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
  const formData = new FormData();

  formData.append('files', file);

  return apiClient(`/uploads/${procedureId}/${type}`, {
    method: 'POST',
    body: formData,
  });
};
