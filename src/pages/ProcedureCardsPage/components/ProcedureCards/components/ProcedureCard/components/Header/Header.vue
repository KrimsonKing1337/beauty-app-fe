<script setup lang="ts">
import { computed, inject, ref } from 'vue';

import type { Procedure } from '@/@types';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore';

import {
  useDeleteProcedureMutation,
} from '@/composables/mutations/procedures/useDeleteProcedureMutation';

import { useProcedurePlacesQuery } from '@/composables/queries/procedurePlaces/useProcedurePlacesQuery.ts';

import { procedureCardsContextKey } from '@/pages/ProcedureCardsPage/utils/procedureCardsContext';

import { getProcedurePlaceNameById } from '@/pages/ProcedureCardsPage/utils';

import { CardHeader, RemovingDialog } from '@/components';

import { getCardInfo } from '../../utils';

const props = defineProps<{ card: Procedure }>();

const deleteProcedureMutation = useDeleteProcedureMutation();
const procedureCardsStore = useProcedureCardsStore();

const { data: procedurePlaces } = useProcedurePlacesQuery();

const placeName = computed(() => getProcedurePlaceNameById(procedurePlaces.value, props.card.placeId));
const cardInfo = computed(() => getCardInfo(props.card, placeName.value));
const meta = computed(() => cardInfo.value.meta);
const price = computed(() => cardInfo.value.price);

const procedureCardsContext = inject(procedureCardsContextKey);
const cards = computed(() => procedureCardsContext?.cards.value ?? []);

const handleRemoveCard = async (id: string) => {
  const index = cards.value.findIndex((card) => card.id === id);

  if (index === -1) {
    return;
  }

  const prevId = cards.value[index - 1]?.id ?? null;
  const nextId = cards.value[index + 1]?.id ?? null;

  await deleteProcedureMutation.mutateAsync(id);

  if (procedureCardsStore.editingCardId === id) {
    procedureCardsStore.clearDraft();
  }

  if (procedureCardsStore.lastTouchedCardId === id) {
    procedureCardsStore.setLastTouchedCardId(nextId ?? prevId);
  }
};

const dialogIsOpen = ref(false);

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
      dialogIsOpen.value = true;
    },
  },
]);

const confirmHandler = () => {
  handleRemoveCard(props.card.id);

  dialogIsOpen.value = false;
};
</script>

<template>
  <CardHeader
    :left-top="props.card.procedureName"
    :left-bottom="meta"
    :right-top="price"
    :menu-items="menuItems"
  />

  <RemovingDialog
    :is-open="dialogIsOpen"
    @close="dialogIsOpen = false"
    @confirm="confirmHandler"
  />
</template>

<style scoped lang="scss">

</style>
