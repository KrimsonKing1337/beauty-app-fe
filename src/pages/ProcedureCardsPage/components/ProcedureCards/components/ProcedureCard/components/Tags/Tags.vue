<script setup lang="ts">
import { computed } from 'vue';

import type { Tag } from '@/@types';

const props = defineProps<{ tags: Tag[], tagIds: string[] }>();

const tagsFiltered = computed(() => {
  const result: Tag[] = [];

  if (!props.tags) {
    return result;
  }

  props.tags.forEach((tagCur) => {
    if (props.tagIds.includes(tagCur.id)) {
      result.push(tagCur);
    }
  });

  return result;
});
</script>

<template>
  <VChipGroup v-if="tagsFiltered?.length" class="Tags">
    <VChip
      v-for="tagCur in tagsFiltered"
      :key="tagCur.id"
      link
      color="pink-lighten-3"
    >
      {{ tagCur.name }}
    </VChip>
  </VChipGroup>
</template>

<style scoped lang="scss">
.Tags {
  margin-top: 10px;
}
</style>
