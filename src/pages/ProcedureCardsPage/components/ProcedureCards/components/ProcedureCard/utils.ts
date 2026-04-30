import type { Procedure } from '@/@types';

import { formatDate } from '@/utils';

export const getCardInfo = (card: Procedure) => {
  const date = formatDate(card.date.toISOString());

  let meta = `${date} - ${card.place}`;

  if (card.durationHours && card.durationMinutes) {
    meta += ` - ${card.durationHours}ч ${card.durationMinutes}мин`;
  } else if (card.durationHours && !card.durationMinutes) {
    meta += ` - ${card.durationHours}ч`;
  } else if (!card.durationHours && card.durationMinutes) {
    meta += ` - ${card.durationMinutes}мин`;
  }

  const price = card.price ? `${card.price} ₽` : '';

  return {
    meta,
    price,
  };
};
