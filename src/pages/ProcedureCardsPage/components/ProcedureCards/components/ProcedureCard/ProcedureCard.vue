<script setup lang="ts">
import type { Procedure } from '@/@types';

import { getApiOrigin } from '@/api/config.ts';

import {
  getBeforeAfterImagePaths,
} from '@/pages/ProcedureCardsPage/components/ProcedureCards/components/ProcedureCard/utils.ts';

import {
  type ChipsProps,

  BeforeAfter,
  Chips,
  Notes,
  Card,
} from '@/components';

import { Header } from './components';

const props = defineProps<{ card: Procedure }>();

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

const beforeImagePaths = getBeforeAfterImagePaths(props.card.beforeImagePaths);
const afterImagePaths = getBeforeAfterImagePaths(props.card.afterImagePaths);
</script>

<template>
  <Card>
    <Header :card="card" />

    <BeforeAfter
      :before-image-paths="beforeImagePaths"
      :after-image-paths="afterImagePaths"
    />

    <Notes v-if="props.card.notes">
      {{ props.card.notes }}
    </Notes>

    <Chips v-if="false" :chips="chips" />
  </Card>
</template>

<style scoped lang="scss">

</style>
