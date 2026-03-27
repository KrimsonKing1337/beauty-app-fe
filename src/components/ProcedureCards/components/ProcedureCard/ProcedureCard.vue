<script setup lang="ts">
import {
  type ChipsProps,

  BeforeAfter,
  Chips,
  Notes,
  Card,
} from '@/components';

import type { ProcedureCardProps } from './ProcedureCard.types.ts';

import { Header } from './components';

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
  <Card>
    <Header
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
  </Card>
</template>

<style scoped lang="scss">

</style>
