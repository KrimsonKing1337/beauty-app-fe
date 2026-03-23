<script setup lang="ts">
import type { ChipsProps } from './Chips.types.ts';
import { Chip } from '@/components';

const props = defineProps<ChipsProps>();
</script>

<template>
  <div class="Chips">
    <Chip v-for="chipCur in props.chips" :key="chipCur.id" :isActive="chipCur.isActive">
      {{ chipCur.label }}
    </Chip>
  </div>
</template>

<style scoped lang="scss">
  .Chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: var(--space-12);
  }
</style>
