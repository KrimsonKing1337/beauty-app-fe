<script setup lang="ts">
import { computed, ref } from 'vue';

import type { Procedure } from '@/@types';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore';

import {
  useDeleteProcedureMutation,
} from '@/composables/mutations/procedures/useDeleteProcedureMutation';

import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery';

import { CardHeader } from '@/components';

import { getCardInfo } from '../../utils';

const props = defineProps<{ card: Procedure }>();

const deleteProcedureMutation = useDeleteProcedureMutation();
const proceduresQuery = useProceduresQuery();
const procedureCardsStore = useProcedureCardsStore();

const cardInfo = computed(() => getCardInfo(props.card));
const meta = computed(() => cardInfo.value.meta);
const price = computed(() => cardInfo.value.price);

const handleRemoveCard = async (id: string) => {
  const cards = proceduresQuery.data.value ?? [];
  const index = cards.findIndex((card) => card.id === id);

  if (index === -1) {
    return;
  }

  const prevId = cards[index - 1]?.id ?? null;
  const nextId = cards[index + 1]?.id ?? null;

  await deleteProcedureMutation.mutateAsync(id);

  if (procedureCardsStore.editingCardId === id) {
    procedureCardsStore.clearDraft();
  }

  if (procedureCardsStore.lastTouchedCardId === id) {
    procedureCardsStore.setLastTouchedCardId(nextId ?? prevId);
  }
};

const menuItems = ref([
  {
    id: 'edit',
    label: 'Редактировать',
    icon: 'mdi-pencil',
    action: () => {
      procedureCardsStore.startEditCard(props.card);
    },
  },
  {
    id: 'duplicate',
    label: 'Дублировать',
    icon: 'mdi-content-copy',
    action: () => {
      procedureCardsStore.duplicateCardDraft(props.card);
    },
  },
  {
    id: 'delete',
    label: 'Удалить',
    icon: 'mdi-trash-can',
    action: () => {
      handleRemoveCard(props.card.id);
    },
  },
]);
</script>

<template>
  <CardHeader
    :left-top="props.card.procedureName"
    :left-bottom="meta"
    :right-top="price"
    :menu-items="menuItems"
  />
</template>

<style scoped lang="scss">

</style>
