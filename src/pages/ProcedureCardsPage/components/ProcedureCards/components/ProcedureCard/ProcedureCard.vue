<script setup lang="ts">
import type { ProcedureCard as ProcedureCardType } from '@/stores/procedureCardsStore';

import {
  type ChipsProps,

  BeforeAfter,
  Chips,
  Notes,
  Card,
} from '@/components';


import { Header } from './components';

const props = defineProps<{ card: ProcedureCardType }>();

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
  },
];
</script>

<template>
  <Card>
    <Header :card="card" />

    <BeforeAfter
      :before-image-paths="card.beforeImagePaths"
      :after-image-paths="card.afterImagePaths"
    />

    <Notes v-if="props.card.notes">
      {{ props.card.notes }}
    </Notes>

    <Chips v-if="false" :chips="chips" />
  </Card>
</template>

<style scoped lang="scss">

</style>
