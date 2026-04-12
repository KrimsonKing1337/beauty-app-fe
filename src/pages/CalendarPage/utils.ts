import { isSameDate } from '@/utils';

type DateItem = {
  date?: Date;
  dateTime?: Date;
};

export type GetTodayItemsArgs<T> = {
  items?: T[],
  date: Date;
};

export const getTodayItems = <T extends DateItem>({
  items,
  date,
}: GetTodayItemsArgs<T>): T[] => {
  if (!items) {
    return [];
  }

  return items.filter((itemCur) => {
    const itemDate = itemCur.date ?? itemCur.dateTime;

    if (!itemDate) {
      return;
    }

    return isSameDate(itemDate, date);
  });
};
