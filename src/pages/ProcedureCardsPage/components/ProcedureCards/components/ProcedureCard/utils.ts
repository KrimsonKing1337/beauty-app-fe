import type { Procedure } from '@/@types';

import { formatDate } from '@/utils';

export const getCardInfo = (card: Procedure) => {
  const date = formatDate(card.date.toISOString());

  const meta = `${date} - ${card.place} - ${card.durationHours}ч ${card.durationMinutes}мин;`;
  const price = card.price ? `${card.price} ₽` : '0 ₽';

  return {
    meta,
    price,
  };
};
