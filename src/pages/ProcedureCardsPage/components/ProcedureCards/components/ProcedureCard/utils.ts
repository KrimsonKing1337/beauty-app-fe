import type { ProcedureCard as ProcedureCardType } from '@/stores/procedureCardsStore';

import { formatDate } from '@/utils';

export const getCardInfo = (card: ProcedureCardType) => {
  const date = formatDate(card.date);

  const meta = `${date} - ${card.place} - ${card.duration};`;
  const price = card.price ? `${card.price} Р` : '0 Р';

  return {
    meta,
    price,
  };
};
