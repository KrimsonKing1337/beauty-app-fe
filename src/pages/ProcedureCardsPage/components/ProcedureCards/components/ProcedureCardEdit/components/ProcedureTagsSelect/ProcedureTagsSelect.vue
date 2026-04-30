<script setup lang="ts">
import { computed } from 'vue';

import type { ProcedureTagsModel } from '@/@types';

import { useTagsQuery } from '@/composables/queries/tags/useTagsQuery';

import {
  useDeleteTagMutation,
} from '@/composables/mutations/tags/useDeleteTagMutation';

import { getTagsOptions } from './utils';

const model = defineModel<ProcedureTagsModel>({
  required: true,
});

const { data: tags } = useTagsQuery();
const deleteTagMutation = useDeleteTagMutation();

const tagsOptions = computed(() => {
  return getTagsOptions(tags.value ?? []);
});

const updateTagValues = (value: string[]) => {
  model.value = {
    ...model.value,
    tagValues: value,
  };
};

const updateCustomTagValue = (value: string) => {
  model.value = {
    ...model.value,
    customTagValue: value,
  };
};

const deleteButtonClickHandler = async (id: string) => {
  await deleteTagMutation.mutateAsync(id);

  updateTagValues(
    model.value.tagValues.filter((tagId) => tagId !== id),
  );
};
</script>

<template>
  <div class="ProcedureTagsSelect">
    <VSelect
      :model-value="model.tagValues"
      :items="tagsOptions"
      label="Тэги"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      chips
      multiple
      @update:model-value="updateTagValues"
    >
      <template #item="{ props: itemProps, item }">
        <VListItem v-bind="itemProps" class="SelectItem">
          <VBtn
            v-if="item.isCustom"
            icon="mdi-close"
            variant="text"
            title="Удалить тэг"
            @click.capture.stop="deleteButtonClickHandler(item.value)"
          />
        </VListItem>
      </template>
    </VSelect>

    <VTextField
      :model-value="model.customTagValue"
      label="Название нового тэга"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      @update:model-value="updateCustomTagValue"
    />
  </div>
</template>

<style scoped lang="scss">
.ProcedureTagsSelect {
  border: 1px #ccc solid;
  border-radius: 12px;
  padding: 20px;
  transition: border 0.2s, padding 0.2s;
  margin-top: 32px;
}

.SelectItem {
  :deep(.v-list-item__content) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
