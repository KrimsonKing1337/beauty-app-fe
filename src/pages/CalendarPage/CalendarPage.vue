<script setup lang="ts">
import { computed } from 'vue';

import { Calendar } from 'v-calendar';

import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery.ts';
import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery.ts';

const {
  data: cards,
} = useProceduresQuery();

const {
  data: reminders,
} = useRemindersQuery();

const attrs = computed<typeof Calendar['attributes']>(() => {
  const today = {
    key: 'today',
    highlight: true,
    dates: [new Date()],
  };

  if (!cards?.value || !reminders.value) {
    return today;
  }

  const daysOfCards = cards.value.map((cardCur) => {
    const { id, date, procedureName, place, price, notes } = cardCur;

    const label = `${procedureName} ${place} ${price}Р ${notes}`;

    return {
      key: id,
      dot: true,
      dates: [date],
      popover: {
        label: label,
        visibility: 'click',
        hideIndicator: true,
        isInteractive: true,
      },
    }
  });

  const daysOfReminders = reminders.value.map((reminderCur) => {
    const { id, name, dateTime, description } = reminderCur;

    const label = `${name} ${description} ${dateTime.toLocaleString()}`;

    return {
      key: id,
      dot: 'red',
      dates: [dateTime],
      popover: {
        label: label,
        visibility: 'click',
        hideIndicator: true,
        isInteractive: true,
      },
    }
  });

  return [today, ...daysOfCards, ...daysOfReminders];
});
</script>

<template>
  <Calendar
    :attributes="attrs"
    expanded
    titlePosition="right"
    :rows="3"
  />
</template>

<style scoped lang="scss">

</style>
