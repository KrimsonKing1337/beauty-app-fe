import { computed, type Ref } from 'vue';
import { DatePicker } from 'v-calendar';

import type { Reminder as ReminderType } from '@/@types';
import type { ProcedureDto } from '@/api/procedures.ts';

export type UseGetAttrsArgs = {
  procedures: Ref<ProcedureDto[] | undefined>;
  reminders: Ref<ReminderType[] | undefined>;
}

export const useGetAttrs = ({
  procedures,
  reminders,
}: UseGetAttrsArgs) => {
  return computed<typeof DatePicker['attributes']>(() => {
    const today = {
      key: 'today',
      highlight: {
        fillMode: 'outline',
        color: true,
      },
      dates: [new Date()],
    };

    if (!procedures?.value || !reminders.value) {
      return today;
    }

    const daysOfProcedures = procedures.value.map((procedureCur) => {
      const { id, date } = procedureCur;

      return {
        key: id,
        dot: true,
        dates: [date],
      }
    });

    const daysOfReminders = reminders.value.map((reminderCur) => {
      const { id, dateTime } = reminderCur;

      return {
        key: id,
        dot: 'red',
        dates: [dateTime],
      }
    });

    return [today, ...daysOfProcedures, ...daysOfReminders];
  });
}
