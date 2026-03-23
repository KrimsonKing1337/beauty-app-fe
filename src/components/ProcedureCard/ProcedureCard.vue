<script setup lang="ts">
import {
  type ChipsProps,
  type ProcedureCardHeaderProps,
  BeforeAfter,
  Chips,
  Notes,
  ProcedureCardHeader,
} from '@/components';

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
</script>

<template>
  <div class="ProcedureCard">
    <ProcedureCardHeader :title="props.title" :meta="props.meta" :price="props.price" />
    <BeforeAfter v-if="props.beforeAfter" />

    <Notes v-if="props.notes">
      {{ props.notes }}
    </Notes>

    <Chips :chips="chips" />
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
