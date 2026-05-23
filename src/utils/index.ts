import type { ProcedureImage } from '@/@types';

import { getPublicFileUrl } from '@/api/config.ts';

export const formatDate = (date: Date | string | null) => {
  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
    .format(new Date(date))
    .replace(' г.', '');
};

export const isSameDate = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
  );
};

export const trimSeconds = (date: Date): Date => {
  const nextDate = new Date(date);

  nextDate.setSeconds(0, 0);

  return nextDate;
};

export const getProcedureImageUrl = (image: ProcedureImage) => ({
  ...image,
  path: getPublicFileUrl(image.path),
});

export const getProcedureImageUrls = (
  images: ProcedureImage[] | undefined,
) => {
  return (images ?? []).map(getProcedureImageUrl);
};
