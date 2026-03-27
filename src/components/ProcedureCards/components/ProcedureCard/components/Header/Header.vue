<script setup lang="ts">
import { ref } from 'vue';

import type { HeaderProps } from './Header.types.ts';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';
import { CardHeader } from '@/components';

const procedureCardsStore = useProcedureCardsStore();

const props = defineProps<HeaderProps>();

const menuItems = ref([
  {
    label: 'Редактировать',
    icon: 'pi pi-pencil',
    command: () => {
      procedureCardsStore.startEditCard(props.cardId);
    },
  },
  {
    label: 'Дублировать',
    icon: 'pi pi-clone',
    command: () => {
      procedureCardsStore.duplicateCard(props.cardId);
    },
  },
  {
    label: 'Удалить',
    icon: 'pi pi-trash',
    class: 'MenuDeleteButton',
    command: () => {
      procedureCardsStore.removeCard(props.cardId);
    },
  },
]);
</script>

<template>
  <CardHeader
    :left-top="props.title"
    :left-bottom="props.meta"
    :right-top="props.price"
    :menuItems="menuItems"
  />
</template>

<style scoped lang="scss">

</style>
