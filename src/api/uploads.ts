import { apiClient } from '@/api/client.ts';
import { getUploadsUrl } from '@/api/config.ts';

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

  return apiClient(getUploadsUrl(`/${procedureId}/${type}`), {
    method: 'POST',
    body: formData,
  });
};
