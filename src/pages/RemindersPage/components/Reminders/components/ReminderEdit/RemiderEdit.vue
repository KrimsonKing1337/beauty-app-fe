<script setup lang="ts">
import { ref } from 'vue';

import { Button } from 'primevue';

import { storeToRefs } from 'pinia';

import { useRemindersStore } from '@/stores/remindersStore.ts';

import {
  useCreateReminderMutation,
} from '@/composables/mutations/reminders/useCreateReminderMutation.ts';

import {
  useUpdateReminderMutation,
} from '@/composables/mutations/reminders/useUpdateReminderMutation.ts';

import { repeatStoreToUi, repeatUiToStore } from '@/pages/RemindersPage/components/Reminders/utils';

import { Input } from '@/components';

import { trimSeconds } from '@/utils';

import { ItemRepeat, ItemDateTime, ItemMinutesBefore } from './components';

const remindersStore = useRemindersStore();
const updateReminderMutation = useUpdateReminderMutation();
const createReminderMutation = useCreateReminderMutation();

const { draftReminder } = storeToRefs(remindersStore);

const repeatValues = repeatStoreToUi(draftReminder.value!.repeat);

const repeatFormRef = ref(repeatValues);

const saveButtonClickHandler = async () => {
  if (!remindersStore.draftReminder) {
    return;
  }

  const draft = remindersStore.draftReminder;
  const repeat = repeatUiToStore(repeatFormRef.value);

  const basePayload = {
    name: draft.name,
    description: draft.description,
    dateTime: trimSeconds(draft.dateTime),
    repeat: repeat,
    notifications: draft.notifications,
    isCompleted: draft.isCompleted,
  };

  if (remindersStore.editingReminderId) {
    const saved = await updateReminderMutation.mutateAsync({
      id: remindersStore.editingReminderId,
      payload: basePayload,
    });

    remindersStore.setLastTouchedReminderId(saved.id);
  } else {
    const saved = await createReminderMutation.mutateAsync(basePayload);

    remindersStore.setLastTouchedReminderId(saved.id);
  }

  remindersStore.clearDraft();
};

const cancelButtonClickHandler = () => {
  remindersStore.cancelEdit();
};
</script>

<template v-if="!!draftReminder">
  <div class="ReminderEdit">
    <VTextField
      v-model="draftReminder!.name"
      label="Название"
      variant="outlined"
      bg-color="#fff"
    />

    <VTextField
      v-model="draftReminder!.description"
      label="Описание"
      variant="outlined"
      bg-color="#fff"
    />

    <ItemDateTime v-model="draftReminder!.dateTime" />
    <ItemRepeat v-model="repeatFormRef" />
    <ItemMinutesBefore v-model="draftReminder!.notifications.minutesBefore" />

    <div class="BottomNav">
      <Button severity="success" @click="saveButtonClickHandler">
        Сохранить
      </Button>

      <Button severity="secondary" @click="cancelButtonClickHandler">
        Отменить
      </Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ReminderEdit {
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
}

.ReminderEditItem {
  margin-top: var(--space-32);
}

.BottomNav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: var(--space-32);
}

.ButtonBar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
