<script setup lang="ts">
import { computed, ref } from 'vue';

import { DatePicker } from 'v-calendar';

import type { Reminder as ReminderType } from '@/@types';
import type { ProcedureDto } from '@/api/procedures.ts';

import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery.ts';
import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery.ts';

import { ProcedureCard } from '@/components/ProcedureCards/components/ProcedureCard';
import { Reminder } from '@/components/Reminders/components/Reminder';

import { getTodayItems } from '@/pages/CalendarPage/utils.ts';

const { data: procedures } = useProceduresQuery();
const { data: reminders } = useRemindersQuery();

const attrs = computed<typeof DatePicker['attributes']>(() => {
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

const dateRef = ref(new Date());

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
    <div v-if="proceduresComputed.length">
      <div v-for="procedureCur in proceduresComputed" :key="procedureCur.id">
        <ProcedureCard :card="procedureCur" />
      </div>
    </div>

    <div v-if="remindersComputed.length">
      <div v-for="reminderCur in remindersComputed" :key="reminderCur.id">
        <Reminder :reminder="reminderCur" />
      </div>
    </div>
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
