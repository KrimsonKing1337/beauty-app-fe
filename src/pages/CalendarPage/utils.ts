import { isSameDate } from '@/utils';
import { computed, type Ref } from 'vue';

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

export const createErrorMessage = <T extends { message?: string }>(
  isError: Ref<boolean>,
  error: Ref<T | null | undefined>,
  fallback = 'Неизвестная ошибка',
) => {
  return computed<string | null>(() => {
    if (!isError.value) {
      return null;
    }

    return error.value?.message ?? fallback;
  });
};
