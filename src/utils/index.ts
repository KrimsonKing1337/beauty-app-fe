import type { ProcedureDto } from '@/api/procedures.ts';
import type { ProcedureCard } from '@/stores/procedureCardsStore.ts';

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

export const mapProcedureDtoToModel = (dto: ProcedureDto): ProcedureCard => ({
  id: dto.id,
  procedureName: dto.procedureName,
  date: new Date(dto.date),
  place: dto.place,
  duration: dto.duration,
  price: dto.price,
  beforeAfter: dto.beforeAfter,
  notes: dto.notes,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
});
