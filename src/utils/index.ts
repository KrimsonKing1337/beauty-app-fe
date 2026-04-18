import type { ProcedureDto, Procedure } from '@/@types';

export const formatDate = (date: string | null) => {
  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
    .format(new Date(date))
    .replace(' г.', '');
};

export const mapProcedureDtoToModel = (dto: ProcedureDto): Procedure => ({
  id: dto.id,
  procedureName: dto.procedureName,
  date: new Date(dto.date),
  place: dto.place,
  duration: dto.duration,
  price: dto.price,
  beforeAfter: dto.beforeAfter,
  beforeImagePaths: dto.beforeImagePaths,
  afterImagePaths: dto.afterImagePaths,
  notes: dto.notes,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});

export const isSameDate = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
  );
};
