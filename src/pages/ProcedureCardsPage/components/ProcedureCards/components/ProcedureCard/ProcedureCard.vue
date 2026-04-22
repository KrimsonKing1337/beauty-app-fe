<script setup lang="ts">
import type { Procedure } from '@/@types';

import {
  BeforeAfter,
  Notes,
  Card,
} from '@/components';

import { getBeforeAfterImagePaths } from '@/utils';

import { Header } from './components';

const props = defineProps<{ card: Procedure }>();

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
  </Card>
</template>

<style scoped lang="scss">

</style>
