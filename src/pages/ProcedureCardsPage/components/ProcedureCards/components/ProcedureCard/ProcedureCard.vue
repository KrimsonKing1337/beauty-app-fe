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

    <div class="Type">
      Тип: {{ props.card.typeId }}
    </div>

    <BeforeAfter
      :before-image-paths="beforeImagePaths"
      :after-image-paths="afterImagePaths"
    />

    <Notes v-if="props.card.notes">
      {{ props.card.notes }}
    </Notes>

    <VChipGroup class="ChipGroup">
      <VChip link color="pink-lighten-3">
        Подмышки
      </VChip>

      <VChip link color="pink-lighten-3">
        Дорого
      </VChip>
    </VChipGroup>
  </Card>
</template>

<style scoped lang="scss">
.Type {
  color: var(--text-secondary);
}

.ChipGroup {
  margin-top: 10px;
}
</style>
