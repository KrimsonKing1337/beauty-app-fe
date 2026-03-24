<script setup lang="ts">
import {
  type ChipsProps,
  BeforeAfter,
  Chips,
  Notes,
  ProcedureCardHeader,
} from '@/components';

import type { ProcedureCardProps } from './ProcedureCard.types.ts';

const props = withDefaults(defineProps<ProcedureCardProps>(), {
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
</script>

<template>
  <div class="ProcedureCard">
    <ProcedureCardHeader
      :cardId="props.cardId"
      :title="props.title"
      :meta="props.meta"
      :price="props.price"
    />

    <BeforeAfter v-if="props.beforeAfter" />

    <Notes v-if="props.notes">
      {{ props.notes }}
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
