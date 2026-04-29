<script setup lang="ts">
import { computed } from 'vue';

import type { Procedure } from '@/@types';

import { useProcedureTypesQuery } from '@/composables/queries/procedureTypes/useProcedureTypesQuery.ts';

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

const { data: procedureTypes } = useProcedureTypesQuery();

const procedureTypesById = computed(() => {
  const types = procedureTypes.value ?? [];

  const entries = types.map((type) => {
    const id = type.id;

    return [id, type] as const;
  });

  return new Map(entries);
});

const typeName = computed(() => {
  const typeId = props.card.typeId;

  if (!typeId) {
    return null;
  }

  const map = procedureTypesById.value;

  const type = map.get(typeId);

  if (!type) {
    return null;
  }

  return type.name;
});
</script>

<template>
  <Card>
    <Header :card="card" />

    <div v-if="typeName" class="Type">
      Тип: {{ typeName }}
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
