<script setup lang="ts">
import { computed, ref } from 'vue';

import { DatePicker } from 'v-calendar';

import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery.ts';
import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery.ts';

import { isSameDate } from '@/utils';

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
  if (!procedures?.value) {
    return [];
  }

  const filteredProcedures = procedures.value.filter((procedureCur) => {
    return isSameDate(procedureCur.date, dateRef.value);
  });

  return filteredProcedures.map((procedureCur) => {
    const { id, procedureName, place, price, notes } = procedureCur;

    const label = `${procedureName} ${place} ${price}Р ${notes}`;

    return {
      id,
      label,
    };
  });
});

const remindersComputed = computed(() => {
  if (!reminders?.value) {
    return [];
  }

  const filteredReminders = reminders.value.filter((reminderCur) => {
    return isSameDate(reminderCur.dateTime, dateRef.value);
  });

  return filteredReminders.map((procedureCur) => {
    const { id, name } = procedureCur;

    return {
      id,
      label: name,
    };
  });
});
</script>

<template>
  <DatePicker
    v-model="dateRef"
    :attributes="attrs"
    expanded
    titlePosition="right"
  />

  <div v-if="proceduresComputed.length" style="border: 1px red solid;">
    <div v-for="procedureCur in proceduresComputed" :key="procedureCur.id">
      {{ procedureCur.label }}
    </div>
  </div>

  <div v-if="remindersComputed.length" style="border: 1px blue solid;">
    <div v-for="reminderCur in remindersComputed" :key="reminderCur.id">
      {{ reminderCur.label }}
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
