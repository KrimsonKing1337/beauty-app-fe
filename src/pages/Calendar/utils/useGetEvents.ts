import { computed, type Ref } from 'vue';

import type { Procedure, Reminder as ReminderType } from '@/@types';

export type UseGetEventsArgs = {
  procedures: Ref<Procedure[] | undefined>;
  reminders: Ref<ReminderType[] | undefined>;
};

const getDayKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const useGetEvents = ({
  procedures,
  reminders,
}: UseGetEventsArgs) => {
  const procedureDays = computed(() => {
    return new Set(
      (procedures.value ?? []).map((procedureCur) => {
        return getDayKey(new Date(procedureCur.date));
      }),
    );
  });

  const reminderDays = computed(() => {
    return new Set(
      (reminders.value ?? []).map((reminderCur) => {
        return getDayKey(new Date(reminderCur.dateTime));
      }),
    );
  });

  const events = (date: string) => {
    const colors: string[] = [];

    if (procedureDays.value.has(date)) {
      colors.push('blue');
    }

    if (reminderDays.value.has(date)) {
      colors.push('red');
    }

    return colors.length ? colors : false;
  };

  return {
    events,
  };
};
