<script setup lang="ts">
import { ref } from 'vue';

import { useRemindersStore } from '@/stores/remindersStore.ts';

import { CardHeader } from '@/components';

const props = defineProps<{
  id: string;
  leftTop: string;
  leftBottom: string;
  rightTop: string;
  rightBottom: string;
}>();

const remindersStore = useRemindersStore();

const menuItems = ref([
  {
    label: 'Редактировать',
    icon: 'pi pi-pencil',
    command: () => {
      remindersStore.startEditReminder(props.id);
    },
  },
  {
    label: 'Дублировать',
    icon: 'pi pi-clone',
    command: () => {
      remindersStore.duplicateReminder(props.id);
    },
  },
  {
    label: 'Удалить',
    icon: 'pi pi-trash',
    class: 'MenuDeleteButton',
    command: () => {
      remindersStore.removeReminder(props.id);
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
