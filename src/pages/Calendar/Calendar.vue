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

const {
  data: procedures,
  isLoading: isProceduresLoading,
  isError: isProceduresError,
  error: proceduresError,
} = useProceduresQuery();

const {
  data: reminders,
  isLoading: isRemindersLoading,
  isError: isRemindersError,
  error: remindersError,
} = useRemindersQuery();

const { events } = useGetEvents({
  procedures,
  reminders,
});

const dateRef = ref(new Date());

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

const proceduresErrorMessage = createErrorMessage(isProceduresError, proceduresError);
const remindersErrorMessage = createErrorMessage(isRemindersError, remindersError);
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
    />

    <div class="ItemsWrapper">
      <ProcedureCards
        v-if="proceduresComputed.length"
        :cards="proceduresComputed"
        :is-loading="isProceduresLoading"
        :error-message="proceduresErrorMessage"
        :is-editing="isProcedureEditing"
        :last-touched-card-id="lastTouchedCardId"
      />

      <Reminders
        v-if="remindersComputed.length"
        :reminders="remindersComputed"
        :is-loading="isRemindersLoading"
        :error-message="remindersErrorMessage"
        :is-editing="isReminderEditing"
        :last-touched-reminder-id="lastTouchedReminderId"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ItemsWrapper {
  margin-top: 20px;
}
</style>
