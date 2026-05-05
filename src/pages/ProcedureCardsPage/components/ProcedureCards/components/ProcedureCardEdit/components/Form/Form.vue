<script setup lang="ts">
import type { ProcedureDraft } from '@/@types';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';

import { DateTimeChooser } from '@/components';

const props = defineProps<{
  draftCard: ProcedureDraft;
}>();

const emit = defineEmits<{
  (e: 'update:procedureName', value: string): void;
  (e: 'update:dateTime', value: Date): void;
  (e: 'update:place', value: string): void;
  (e: 'update:durationHours', value: number): void;
  (e: 'update:durationMinutes', value: number): void;
  (e: 'update:price', value: number): void;
  (e: 'update:notes', value: string): void;
}>();

const procedureCardStore = useProcedureCardsStore();
</script>

<template>
  <div class="ProcedureCardEditForm">
    <VTextField
      :model-value="draftCard.procedureName"
      label="Название процедуры"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      @update:model-value="emit('update:procedureName', $event)"
    />

    <DateTimeChooser
      :model-value="props.draftCard.dateTime"
      placeholder="Дата и время проведения"
      :show-value-initially="!!procedureCardStore.editingCardId"
      @update:model-value="emit('update:dateTime', $event)"
    />

    <VTextField
      :model-value="draftCard.place"
      label="Место проведения"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      @update:model-value="emit('update:place', $event)"
    />

    <div class="DurationInputs">
      <VNumberInput
        :model-value="draftCard.durationHours"
        label="Длительность: часы"
        variant="outlined"
        bg-color="#fff"
        rounded="lg"
        :min="0"
        :max="24"
        @update:model-value="emit('update:durationHours', $event)"
      />

      <VNumberInput
        :model-value="draftCard.durationMinutes"
        label="Длительность: минуты"
        variant="outlined"
        bg-color="#fff"
        rounded="lg"
        :min="0"
        :max="59"
        @update:model-value="emit('update:durationMinutes', $event)"
      />
    </div>

    <VNumberInput
      :model-value="draftCard.price"
      label="Цена"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      :min="0"
      @update:model-value="emit('update:price', $event)"
    />

    <VTextField
      :model-value="draftCard.notes"
      label="Описание"
      variant="outlined"
      bg-color="#fff"
      rounded="lg"
      @update:model-value="emit('update:notes', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.DurationInputs {
  display: flex;
  gap: 10px;
}
</style>
