<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { storeToRefs } from 'pinia';

import { useQueryClient } from '@tanstack/vue-query';

import type {
  ProcedureDraft,
  ProcedureTagsModel,
  ProcedureTypeModel,
  ReminderNotifications,
} from '@/@types';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore.ts';

import { useSaveProcedureMutation } from '@/composables/mutations/procedures/useSaveProcedureMutation';
import { useCreateReminderMutation } from '@/composables/mutations/reminders/useCreateReminderMutation';
import { useUpdateReminderMutation } from '@/composables/mutations/reminders/useUpdateReminderMutation';

import { useRemindersQuery } from '@/composables/queries/reminders/useRemindersQuery';

import { CardActions, RemindFor } from '@/components';

import type { ImageFiles } from './@types';

import {
  Form,
  UploadImages,
  ProcedureTypeSelect,
  ProcedureTagsSelect,
} from './components';

import { saveButtonClickHandler } from './utils';

const queryClient = useQueryClient();

const procedureCardsStore = useProcedureCardsStore();

const saveProcedureMutation = useSaveProcedureMutation();
const createReminderMutation = useCreateReminderMutation();
const updateReminderMutation = useUpdateReminderMutation();

const { data: reminders } = useRemindersQuery();

const { draftCard } = storeToRefs(procedureCardsStore);

const saveButtonIsLoadingRef = ref(false);

const procedureTypeModel = ref<ProcedureTypeModel>({
  typeValue: draftCard.value?.typeId ?? null,
});

const procedureTagsModel = ref<ProcedureTagsModel>({
  tagValues: draftCard.value?.tagIds ?? [],
});

const imageFilesRef = ref<ImageFiles>({
  before: null,
  after: null,
});

const remindForValuesRef = ref<ReminderNotifications>({
  daysBefore: 0,
  hoursBefore: 0,
  minutesBefore: 0,
});

const existingProcedureReminder = computed(() => {
  const procedureId = procedureCardsStore.editingCardId;

  if (!procedureId) {
    return null;
  }

  return reminders.value?.find((reminderCur) => {
    return reminderCur.procedureId === procedureId;
  }) ?? null;
});

watch(
  existingProcedureReminder,
  (reminder) => {
    if (!reminder) {
      remindForValuesRef.value = {
        daysBefore: 0,
        hoursBefore: 0,
        minutesBefore: 0,
      };

      return;
    }

    remindForValuesRef.value = {
      ...reminder.notifications,
    };
  },
  { immediate: true },
);

const resetImageFiles = () => {
  imageFilesRef.value = {
    before: null,
    after: null,
  };
};

const invalidateCacheCallback = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ['procedures'] }),
    queryClient.invalidateQueries({ queryKey: ['reminders'] }),
  ]);
};

const handleSaveClick = async () => {
  if (!procedureCardsStore.draftCard) {
    return;
  }

  saveButtonIsLoadingRef.value = true;

  try {
    procedureCardsStore.draftCard.typeId = procedureTypeModel.value.typeValue;
    procedureCardsStore.draftCard.tagIds = procedureTagsModel.value.tagValues;

    await saveButtonClickHandler({
      store: procedureCardsStore,
      saveProcedureMutation,
      createReminderMutation,
      updateReminderMutation,
      invalidateCacheCallback,
      files: imageFilesRef.value,
      remindForValues: remindForValuesRef.value,
      existingProcedureReminder: existingProcedureReminder.value,
    });

    resetImageFiles();
  } finally {
    saveButtonIsLoadingRef.value = false;
  }
};

const handleCancelClick = () => {
  resetImageFiles();
  procedureCardsStore.cancelEdit();
};

const updateDraftCard = <K extends keyof NonNullable<ProcedureDraft>>(
  key: K,
  value: NonNullable<ProcedureDraft>[K],
) => {
  if (!procedureCardsStore.draftCard) {
    return;
  }

  procedureCardsStore.draftCard[key] = value;
};
</script>

<template>
  <div v-if="draftCard" class="ProcedureCardEdit">
    <div class="Item">
      <Form
        :draft-card="draftCard"
        @update:procedure-name="updateDraftCard('procedureName', $event)"
        @update:date-time="updateDraftCard('dateTime', $event)"
        @update:place="updateDraftCard('place', $event)"
        @update:duration-hours="updateDraftCard('durationHours', $event)"
        @update:duration-minutes="updateDraftCard('durationMinutes', $event)"
        @update:price="updateDraftCard('price', $event)"
        @update:notes="updateDraftCard('notes', $event)"
      />

      <ProcedureTypeSelect v-model="procedureTypeModel" />
      <ProcedureTagsSelect v-model="procedureTagsModel" />
      <RemindFor v-model="remindForValuesRef" />

      <UploadImages
        :before-file="imageFilesRef.before"
        :after-file="imageFilesRef.after"
        @update:before-file="imageFilesRef.before = $event"
        @update:after-file="imageFilesRef.after = $event"
      />

      <CardActions
        :is-loading="saveButtonIsLoadingRef"
        @save="handleSaveClick"
        @cancel="handleCancelClick"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.ProcedureCardEdit {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(43, 24, 31, 0.04);

  @media (max-width: 400px) {
    padding: 16px 8px;
    border-radius: 16px;
  }
}

.Item {
  margin-top: 32px;

  @media (max-width: 400px) {
    &:first-child {
      margin-top: 8px;
    }
  }
}
</style>
