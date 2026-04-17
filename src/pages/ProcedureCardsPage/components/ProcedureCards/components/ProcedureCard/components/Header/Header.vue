<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  type ProcedureCard as ProcedureCardType,
  useProcedureCardsStore
} from '@/stores/procedureCardsStore';
import { CardHeader } from '@/components';

import { useProceduresQuery } from '@/composables/queries/procedures/useProceduresQuery';
import {
  useDeleteProcedureMutation,
} from '@/composables/mutations/procedures/useDeleteProcedureMutation';

import { getCardInfo } from '../../utils';

const deleteProcedureMutation = useDeleteProcedureMutation();
const proceduresQuery = useProceduresQuery();
const procedureCardsStore = useProcedureCardsStore();

const props = defineProps<{ card: ProcedureCardType }>();

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
    label: 'Редактировать',
    icon: 'pi pi-pencil',
    command: () => {
      procedureCardsStore.startEditCard(props.card);
    },
  },
  {
    label: 'Дублировать',
    icon: 'pi pi-clone',
    command: () => {
      procedureCardsStore.duplicateCardDraft(props.card);
    },
  },
  {
    label: 'Удалить',
    icon: 'pi pi-trash',
    class: 'MenuDeleteButton',
    command: () => {
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
    :menuItems="menuItems"
  />
</template>

<style scoped lang="scss">

</style>
