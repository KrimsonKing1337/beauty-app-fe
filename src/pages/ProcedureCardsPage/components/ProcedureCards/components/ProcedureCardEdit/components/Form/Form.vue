<script setup lang="ts">
import type { ProcedureDraft } from '@/@types';

defineProps<{
  draftCard: ProcedureDraft;
}>();

const emit = defineEmits<{
  (e: 'update:procedureName', value: string): void;
  (e: 'update:date', value: Date): void;
  (e: 'update:place', value: string): void;
  (e: 'update:duration', value: string): void;
  (e: 'update:notes', value: string): void;
}>();
</script>

<template>
  <div class="ProcedureCardEditForm">
    <VTextField
      :model-value="draftCard.procedureName"
      label="Название процедуры"
      variant="outlined"
      bg-color="#fff"
      class="Input"
      @update:model-value="emit('update:procedureName', $event)"
    />

    <VExpansionPanels class="DatePicker">
      <VExpansionPanel rounded="lg">
        <VExpansionPanelTitle>
          <VIcon icon="mdi-calendar" class="mr-2" />

          <span>
            Дата проведения
          </span>
        </VExpansionPanelTitle>

        <VExpansionPanelText>
          <VDatePicker
            :model-value="draftCard.date"
            label="Дата"
            variant="outlined"
            color="pink-lighten-4"
            width="100%"
            first-day-of-week="1"
            header-date-format="normalDateWithWeekday"
            hide-title
            @update:model-value="emit('update:date', $event)"
          />
        </VExpansionPanelText>
      </VExpansionPanel>
    </VExpansionPanels>

    <VTextField
      :model-value="draftCard.place"
      label="Место проведения"
      variant="outlined"
      bg-color="#fff"
      class="Input"
      @update:model-value="emit('update:place', $event)"
    />

    <VTextField
      :model-value="draftCard.duration"
      label="Длительность"
      variant="outlined"
      bg-color="#fff"
      class="Input"
      @update:model-value="emit('update:duration', $event)"
    />

    <VTextField
      :model-value="draftCard.notes"
      label="Описание"
      variant="outlined"
      bg-color="#fff"
      class="Input"
      @update:model-value="emit('update:notes', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.Input {
  &:deep(.v-field) {
    border-radius: 10px;
  }
}

.DatePicker {
  margin-bottom: 25px;

  &:deep(.v-input__details) {
    display: none;
  }
}
</style>
