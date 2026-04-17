<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { DatePicker } from 'v-calendar';

import type { Reminder as ReminderType } from '@/@types';
import type { ProcedureDto } from '@/api/procedures.ts';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';
import { useRemindersStore } from '@/stores/remindersStore.ts';

import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery.ts';
import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery.ts';

import { ProcedureCards, Reminders } from '@/components';

import { createErrorMessage, getTodayItems, useGetAttrs } from './utils';

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

const attrs = useGetAttrs({
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
  return getTodayItems<ProcedureDto>({
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
  <DatePicker
    v-model="dateRef"
    :attributes="attrs"
    expanded
    titlePosition="right"
    class="Calendar"
  />

  <div class="ItemsWrapper">
    <ProcedureCards
      v-if="proceduresComputed.length"
      :cards="proceduresComputed"
      :isLoading="isProceduresLoading"
      :errorMessage="proceduresErrorMessage"
      :isEditing="isProcedureEditing"
      :lastTouchedCardId="lastTouchedCardId"
    />

    <Reminders
      v-if="remindersComputed.length"
      :reminders="remindersComputed"
      :isLoading="isRemindersLoading"
      :errorMessage="remindersErrorMessage"
      :isEditing="isReminderEditing"
      :lastTouchedReminderId="lastTouchedReminderId"
    />
  </div>
</template>

<style scoped lang="scss">
.ItemsWrapper {
  margin-top: 20px;
}

:global(.Calendar.vc-container.vc-bordered) {
  border-radius: 24px;
}
</style>
