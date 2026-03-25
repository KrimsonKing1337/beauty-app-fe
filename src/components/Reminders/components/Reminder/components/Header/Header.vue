<script setup lang="ts">
import { computed, ref } from 'vue';

import { type Reminder, useRemindersStore } from '@/stores/remindersStore.ts';

import { CardHeader } from '@/components';
import { formatReminderDate } from '@/components/Reminders/utils';

const props = defineProps<{
  reminder: Reminder;
}>();

const remindersStore = useRemindersStore();

const menuItems = ref([
  {
    label: 'Редактировать',
    icon: 'pi pi-pencil',
    command: () => {
      remindersStore.startEditReminder(props.reminder.id);
    },
  },
  {
    label: 'Дублировать',
    icon: 'pi pi-clone',
    command: () => {
      remindersStore.duplicateReminder(props.reminder.id);
    },
  },
  {
    label: 'Удалить',
    icon: 'pi pi-trash',
    class: 'MenuDeleteButton',
    command: () => {
      remindersStore.removeReminder(props.reminder.id);
    },
  },
]);

const formattedDate = computed(() => {
  return formatReminderDate(props.reminder.dateTime);
});

const rightTop = computed(() => {
  return formattedDate.value.main;
});

const rightBottom = computed(() => {
  return formattedDate.value.relative;
});

</script>

<template>
  <CardHeader
    :leftTop="props.reminder.name"
    :leftBottom="props.reminder.description"
    :rightTop="rightTop"
    :rightBottom="rightBottom"
    :menuItems="menuItems"
  />
</template>

<style scoped lang="scss">

</style>
