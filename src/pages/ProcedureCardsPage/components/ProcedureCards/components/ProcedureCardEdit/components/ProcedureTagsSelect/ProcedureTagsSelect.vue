<script setup lang="ts">
import { computed, ref } from 'vue';

import type { ProcedureTagsModel } from '@/@types';

import { useTagsQuery } from '@/composables/queries/tags/useTagsQuery';
import { useCreateTagMutation } from '@/composables/mutations/tags/useCreateTagMutation';
import { useDeleteTagMutation } from '@/composables/mutations/tags/useDeleteTagMutation';

import { getTagsOptions } from './utils';

const model = defineModel<ProcedureTagsModel>({
  required: true,
});

const { data: tags } = useTagsQuery();

const createTagMutation = useCreateTagMutation();
const deleteTagMutation = useDeleteTagMutation();

const isCreateFieldVisible = ref(false);
const newTagName = ref('');

const tagsOptions = computed(() => {
  return getTagsOptions(tags.value ?? []);
});

const updateTagValues = (value: string[]) => {
  model.value = {
    tagValues: value,
  };
};

const showCreateField = () => {
  isCreateFieldVisible.value = true;
};

const hideCreateField = () => {
  isCreateFieldVisible.value = false;
  newTagName.value = '';
};

const createTag = async () => {
  const name = newTagName.value.trim();

  if (!name) {
    return;
  }

  const newTag = await createTagMutation.mutateAsync({
    name,
  });

  const nextTagValues = [...model.value.tagValues];

  if (!nextTagValues.includes(newTag.id)) {
    nextTagValues.push(newTag.id);
  }

  model.value = {
    tagValues: nextTagValues,
  };

  hideCreateField();
};

const deleteButtonClickHandler = async (id: string) => {
  await deleteTagMutation.mutateAsync(id);

  updateTagValues(
    model.value.tagValues.filter((tagId) => {
      return tagId !== id;
    }),
  );
};
</script>

<template>
  <div class="ProcedureTagsSelect">
    <div class="SelectRow">
      <VSelect
        class="Select"
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
              icon="mdi-close"
              variant="text"
              title="Удалить тэг"
              @click.capture.stop="deleteButtonClickHandler(item.value)"
            />
          </VListItem>
        </template>
      </VSelect>

      <VBtn
        class="ButtonNewTag"
        icon="mdi-plus"
        rounded="lg"
        title="Добавить новый тэг"
        color="pink-lighten-3"
        :disabled="isCreateFieldVisible"
        @click="showCreateField"
      />
    </div>

    <div v-if="isCreateFieldVisible" class="CreateRow">
      <VTextField
        v-model="newTagName"
        label="Название нового тэга"
        variant="outlined"
        bg-color="#fff"
        rounded="lg"
        autofocus
        @keyup.enter="createTag"
        @keyup.esc="hideCreateField"
      />

      <VBtn
        icon="mdi-check"
        variant="tonal"
        rounded="lg"
        title="Сохранить тэг"
        :loading="createTagMutation.isPending.value"
        @click="createTag"
      />

      <VBtn
        icon="mdi-close"
        variant="text"
        rounded="lg"
        title="Отмена"
        @click="hideCreateField"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ProcedureTagsSelect {
  border: 1px #ccc solid;
  border-radius: 12px;
  padding: 20px;
  margin-top: 32px;

  :deep(.v-sheet) {
    background-color: red;
  }
}

.SelectRow,
.CreateRow {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.SelectRow {
  .v-select {
    flex: 1;
  }
}

.CreateRow {
  margin-top: 12px;

  .v-input {
    flex: 1;
  }
}

.SelectItem {
  :deep(.v-list-item) {
  }

  :deep(.v-list-item__content) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.ButtonNewTag {
  color: #fff;
}
</style>
