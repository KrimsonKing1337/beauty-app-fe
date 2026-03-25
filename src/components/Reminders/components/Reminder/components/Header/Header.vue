<script setup lang="ts">
import { computed } from 'vue';

import { type Reminder, useRemindersStore } from '@/stores/remindersStore.ts';

import { CardHeader } from '@/components';

const props = defineProps<{
  reminder: Reminder;
  leftTop: string;
  leftBottom: string;
  rightTop: string;
  rightBottom: string;
}>();

const remindersStore = useRemindersStore();

const completed = computed(() => {
  return {
    label: props.reminder.isCompleted ? 'Отменить' : 'Завершить',
    value: !props.reminder.isCompleted,
  };
});

const menuItems = computed(() => [
  {
    label: completed.value.label,
    icon: 'pi pi-check',
    command: () => {
      remindersStore.completeReminder(props.reminder.id, completed.value.value);
    },
  },
  {
    label: 'Редактировать',
    icon: 'pi pi-pencil',
    command: () => {
      remindersStore.startEditReminder(props.reminder.id);
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

</script>

<template>
  <CardHeader
    :leftTop="props.leftTop"
    :leftBottom="props.leftBottom"
    :rightTop="props.rightTop"
    :rightBottom="props.rightBottom"
    :menuItems="menuItems"
  />
</template>

<style scoped lang="scss">

</style>
