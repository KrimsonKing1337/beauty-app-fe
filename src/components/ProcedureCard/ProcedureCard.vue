<script setup lang="ts">
import { storeToRefs } from 'pinia'

import {
  type ChipsProps,
  type ProcedureCardHeaderProps,
  BeforeAfter,
  Chips,
  Notes,
  ProcedureCardHeader,
} from '@/components';
import { useProcedureCardStore } from '@/stores/procedureCardStore.ts';

const props = withDefaults(defineProps<ProcedureCardHeaderProps & {
  beforeAfter?: boolean;
  notes?: string;
}>(), {
  beforeAfter: true,
});

const chips: ChipsProps['chips'] = [
  {
    id: '1',
    label: 'Чип 1',
    isActive: true,
  },
  {
    id: '2',
    label: 'Чип 2',
  },
  {
    id: '3',
    label: 'Чип 3',
  }
];

const procedureCardStore = useProcedureCardStore();
const { card } = storeToRefs(procedureCardStore);

const meta = `${card.value.date} - ${card.value.place} - ${card.value.duration};`
const price = card.value.price ? `${card.value.price} Р` : '0 Р';
</script>

<template>
  <div class="ProcedureCard">
    <ProcedureCardHeader :title="card.name" :meta="meta" :price="price" />
    <BeforeAfter v-if="card.beforeAfter.length" />

    <Notes v-if="card.notes">
      {{ card.notes }}
    </Notes>

    <Chips v-if="false" :chips="chips" />
  </div>
</template>

<style scoped lang="scss">
  .ProcedureCard {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 20px;

    box-shadow: 0 8px 20px rgba(43, 24, 31, 0.04);
  }
</style>
