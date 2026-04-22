import type { Procedure } from '@/@types';;

import { formatDate } from '@/utils';

export const getCardInfo = (card: Procedure) => {
  const date = formatDate(card.date.toISOString());

  const meta = `${date} - ${card.place} - ${card.duration};`;
  const price = card.price ? `${card.price} Р` : '0 Р';

  return {
    meta,
    price,
  };
};
