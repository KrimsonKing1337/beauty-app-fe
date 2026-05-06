<script setup lang="ts">
import { computed, ref } from 'vue';

import { storeToRefs } from 'pinia';

import type { Reminder as ReminderType, Procedure } from '@/@types';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';
import { useRemindersStore } from '@/stores/remindersStore.ts';

import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery.ts';
import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery.ts';

import { ProcedureCards } from '@/pages/ProcedureCardsPage/components';
import { Reminders } from '@/pages/RemindersPage/components';

import {
  createErrorMessage,
  getTodayItems,
  useGetEvents,
} from './utils';

const dateRef = ref(new Date());

const displayedMonthRef = ref(dateRef.value.getMonth());
const displayedYearRef = ref(dateRef.value.getFullYear());

const monthRange = computed(() => {
  const dateFrom = new Date(
    displayedYearRef.value,
    displayedMonthRef.value,
    1,
    0,
    0,
    0,
    0,
  );

  const dateTo = new Date(
    displayedYearRef.value,
    displayedMonthRef.value + 1,
    1,
    0,
    0,
    0,
    0,
  );

  return {
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
  };
});

const proceduresQueryParams = computed(() => ({
  page: 1,
  limit: 100,
  sortBy: 'dateTime' as const,
  sortOrder: 'asc' as const,
  dateFrom: monthRange.value.dateFrom,
  dateTo: monthRange.value.dateTo,
}));

const remindersQueryParams = computed(() => ({
  ...proceduresQueryParams.value,
  includeProcedureReminders: false,
}));

const {
  data: procedures,
  isLoading: isProceduresLoading,
  isError: isProceduresError,
  error: proceduresError,
} = useProceduresQuery(proceduresQueryParams);

const {
  data: reminders,
  isLoading: isRemindersLoading,
  isError: isRemindersError,
  error: remindersError,
} = useRemindersQuery(remindersQueryParams);

const { events } = useGetEvents({
  procedures,
  reminders,
});

const remindersStore = useRemindersStore();
const procedureCardStore = useProcedureCardsStore();

const { draftReminder, lastTouchedReminderId } = storeToRefs(remindersStore);
const { draftCard, lastTouchedCardId } = storeToRefs(procedureCardStore);

const isReminderEditing = computed(() => draftReminder.value !== null);
const isProcedureEditing = computed(() => draftCard.value !== null);

const proceduresComputed = computed(() => {
  return getTodayItems<Procedure>({
    items: procedures.value,
    date: dateRef.value,
  });
});

const remindersComputed = computed(() => {
  return getTodayItems<ReminderType>({
    items: reminders.value,
    date: dateRef.value,
  });
});

const proceduresErrorMessage = createErrorMessage(
  isProceduresError,
  proceduresError,
);

const remindersErrorMessage = createErrorMessage(
  isRemindersError,
  remindersError,
);

const handleMonthUpdate = (month: number) => {
  displayedMonthRef.value = month;
};

const handleYearUpdate = (year: number) => {
  displayedYearRef.value = year;
};
</script>

<template>
  <div>
    <VDatePicker
      v-model="dateRef"
      :events="events"
      variant="outlined"
      color="pink-lighten-4"
      width="100%"
      first-day-of-week="1"
      header-date-format="normalDateWithWeekday"
      hide-title
      rounded="xl"
      @update:month="handleMonthUpdate"
      @update:year="handleYearUpdate"
    />

    <div class="ItemsWrapper">
      <div v-if="proceduresComputed.length" class="ItemWrapper">
        <div class="ItemLabel">
          Процедуры
        </div>

        <ProcedureCards
          :cards="proceduresComputed"
          :is-loading="isProceduresLoading"
          :error-message="proceduresErrorMessage"
          :is-editing="isProcedureEditing"
          :last-touched-card-id="lastTouchedCardId"
        />
      </div>

      <div v-if="remindersComputed.length" class="ItemWrapper">
        <div class="ItemLabel">
          Напоминания
        </div>

        <Reminders
          class="Reminders"
          :reminders="remindersComputed"
          :is-loading="isRemindersLoading"
          :error-message="remindersErrorMessage"
          :is-editing="isReminderEditing"
          :last-touched-reminder-id="lastTouchedReminderId"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ItemsWrapper {
  margin-top: 20px;
}

.ItemWrapper {
  border: 1px #ccc solid;
  border-radius: 12px;
  padding: 20px;
  margin-top: 32px;
}

.ItemLabel {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>
