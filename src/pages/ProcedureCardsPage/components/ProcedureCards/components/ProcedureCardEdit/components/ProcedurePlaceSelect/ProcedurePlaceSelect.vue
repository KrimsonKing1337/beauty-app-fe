<script setup lang="ts">
import { computed, ref } from 'vue';

import type { ProcedurePlace, ProcedurePlaceModel } from '@/@types';

import {
  useCreateProcedurePlaceMutation,
} from '@/composables/mutations/procedurePlaces/useCreateProcedurePlaceMutation';

import {
  useDeleteProcedurePlaceMutation,
} from '@/composables/mutations/procedurePlaces/useDeleteProcedurePlaceMutation';

import { getProcedurePlacesOptions } from './utils';

const props = defineProps<{
  procedurePlaces: ProcedurePlace[],
}>();

const model = defineModel<ProcedurePlaceModel>({
  required: true,
});

const createProcedurePlaceMutation = useCreateProcedurePlaceMutation();
const deleteProcedurePlaceMutation = useDeleteProcedurePlaceMutation();

const isCreateFieldVisible = ref(false);
const newPlaceName = ref('');

const procedurePlacesOptions = computed(() => {
  return getProcedurePlacesOptions(props.procedurePlaces ?? []);
});

const updatePlaceValue = (value: string | null) => {
  model.value = {
    placeValue: value,
  };
};

const showCreateField = () => {
  isCreateFieldVisible.value = true;
};

const hideCreateField = () => {
  isCreateFieldVisible.value = false;
  newPlaceName.value = '';
};

const createProcedurePlace = async () => {
  const name = newPlaceName.value.trim();

  if (!name) {
    return;
  }

  const newPlace = await createProcedurePlaceMutation.mutateAsync({
    name,
  });

  model.value = {
    placeValue: newPlace.id,
  };

  hideCreateField();
};

const deleteButtonClickHandler = async (id: string, name: string) => {
  await deleteProcedurePlaceMutation.mutateAsync(id);

  if (model.value.placeValue === name) {
    updatePlaceValue(null);
  }
};
</script>

<template>
  <div
    class="ProcedurePlaceSelect"
    :class="{ isActive: isCreateFieldVisible }"
  >
    <div class="SelectWrapper">
      <VAutocomplete
        :model-value="model.placeValue"
        :items="procedurePlacesOptions"
        label="Место проведения"
        variant="outlined"
        bg-color="#fff"
        rounded="lg"
        clearable
        hide-details
        @update:model-value="updatePlaceValue"
      >
        <template #item="{ props: itemProps, item }">
          <VListItem v-bind="itemProps" class="SelectItem">
            <VBtn
              v-if="item.isCustom"
              icon="mdi-close"
              variant="text"
              title="Удалить место"
              @click.capture.stop="deleteButtonClickHandler(item.id, item.value)"
            />
          </VListItem>
        </template>
      </VAutocomplete>

      <VBtn
        class="ButtonNewPlace"
        icon="mdi-plus"
        rounded="lg"
        title="Добавить новое место"
        color="pink-lighten-3"
        :disabled="isCreateFieldVisible"
        @click="showCreateField"
      />
    </div>

    <div v-if="isCreateFieldVisible" class="CreateWrapper">
      <VTextField
        v-model="newPlaceName"
        class="Input"
        label="Название нового места"
        variant="outlined"
        bg-color="#fff"
        rounded="lg"
        autofocus
        hide-details
        @keyup.enter="createProcedurePlace"
        @keyup.esc="hideCreateField"
      />

      <VBtn
        icon="mdi-check"
        variant="tonal"
        rounded="lg"
        title="Сохранить место"
        :loading="createProcedurePlaceMutation.isPending.value"
        @click="createProcedurePlace"
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
.ProcedurePlaceSelect {
  border: 0 transparent solid;
  border-radius: 12px;
  padding: 0;
  transition: border 0.2s, padding 0.2s;
  margin-bottom: 22px;

  &.isActive {
    border: 1px #ccc solid;
    padding: 20px;
  }
}

.SelectWrapper,
.CreateWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.CreateWrapper {
  margin-top: 18px;
}

.SelectWrapper {
  :deep(.v-select) {
    flex: 1;
  }
}

.Input {
  flex: 1;
}

.ButtonNewPlace {
  color: #fff;
}

.SelectItem {
  :deep(.v-list-item__content) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
