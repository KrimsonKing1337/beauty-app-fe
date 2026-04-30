<script setup lang="ts">
import { computed, ref } from 'vue';

import type { ProcedureTypeModel } from '@/@types';

import { useProcedureTypesQuery } from '@/composables/queries/procedureTypes/useProcedureTypesQuery';

import {
  useCreateProcedureTypeMutation,
} from '@/composables/mutations/proceduresTypes/useCreateProcedureTypeMutation';

import {
  useDeleteProcedureTypeMutation,
} from '@/composables/mutations/proceduresTypes/useDeleteProcedureTypeMutation';

import { getProcedureTypesOptions } from './utils';

const model = defineModel<ProcedureTypeModel>({
  required: true,
});

const { data: procedureTypes } = useProcedureTypesQuery();

const createProcedureTypeMutation = useCreateProcedureTypeMutation();
const deleteProcedureTypeMutation = useDeleteProcedureTypeMutation();

const isCreateFieldVisible = ref(false);
const newTypeName = ref('');

const procedureTypesOptions = computed(() => {
  return getProcedureTypesOptions(procedureTypes.value ?? []);
});

const updateTypeValue = (value: string | null) => {
  model.value = {
    typeValue: value,
  };
};

const showCreateField = () => {
  isCreateFieldVisible.value = true;
};

const hideCreateField = () => {
  isCreateFieldVisible.value = false;
  newTypeName.value = '';
};

const createProcedureType = async () => {
  const name = newTypeName.value.trim();

  if (!name) {
    return;
  }

  const newType = await createProcedureTypeMutation.mutateAsync({
    name,
  });

  model.value = {
    typeValue: newType.id,
  };

  hideCreateField();
};

const deleteButtonClickHandler = async (id: string) => {
  await deleteProcedureTypeMutation.mutateAsync(id);

  if (model.value.typeValue === id) {
    updateTypeValue(null);
  }
};
</script>

<template>
  <div
    class="ProcedureTypeSelect"
    :class="{ isActive: isCreateFieldVisible }"
  >
    <div class="SelectWrapper">
      <VSelect
        :model-value="model.typeValue"
        :items="procedureTypesOptions"
        label="Тип процедуры"
        variant="outlined"
        bg-color="#fff"
        rounded="lg"
        hide-details
        @update:model-value="updateTypeValue"
      >
        <template #item="{ props: itemProps, item }">
          <VListItem v-bind="itemProps" class="SelectItem">
            <VBtn
              v-if="item.isCustom"
              icon="mdi-close"
              variant="text"
              title="Удалить тип"
              @click.capture.stop="deleteButtonClickHandler(item.value)"
            />
          </VListItem>
        </template>
      </VSelect>

      <VBtn
        class="ButtonNewType"
        icon="mdi-plus"
        rounded="lg"
        title="Добавить новый тип"
        color="pink-lighten-3"
        :disabled="isCreateFieldVisible"
        @click="showCreateField"
      />
    </div>

    <div v-if="isCreateFieldVisible" class="CreateWrapper">
      <VTextField
        v-model="newTypeName"
        class="Input"
        label="Название нового типа"
        variant="outlined"
        bg-color="#fff"
        rounded="lg"
        autofocus
        hide-details
        @keyup.enter="createProcedureType"
        @keyup.esc="hideCreateField"
      />

      <VBtn
        icon="mdi-check"
        variant="tonal"
        rounded="lg"
        title="Сохранить тэг"
        :loading="createProcedureTypeMutation.isPending.value"
        @click="createProcedureType"
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
.ProcedureTypeSelect {
  border: 0 transparent solid;
  border-radius: 12px;
  padding: 0;
  transition: border 0.2s, padding 0.2s;
  margin-top: 32px;

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

.ButtonNewType {
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
