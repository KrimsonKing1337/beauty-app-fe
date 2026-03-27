<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import {
  type DatePickerState,
  Button,
  DatePicker,
  FloatLabel,
  Select,
} from 'primevue';

import { useRemindersStore } from '@/stores/remindersStore.ts';

import { Input } from '@/components';
import { repeatStoreToUi, repeatUiToStore } from '@/components/Reminders/utils';

import { ItemRepeat } from './components';

const remindersStore = useRemindersStore();
const { draftReminder } = storeToRefs(remindersStore);

const repeatValues = repeatStoreToUi(draftReminder.value!.repeat);

const notificationMinutesBeforeOptions = [
  { label: 'Не напоминать', value: 0 },
  { label: '5 минут', value: 5 },
  { label: '15 минут', value: 15 },
  { label: '30 минут', value: 30 },
  { label: '60 минут', value: 60 },
  { label: '2 часа', value: 120 },
  { label: '3 часа', value: 180 },
  { label: '4 часа', value: 240 },
];

const calendarRef = ref<DatePickerState | null>(null);
const repeatFormRef = ref(repeatValues);

const saveButtonClickHandler = () => {
  const valuesToSave = repeatUiToStore({
    preset: repeatFormRef.value.repeat,
    customInterval: repeatFormRef.value.customInterval,
    customUnit: repeatFormRef.value.customUnit,
    daysOfWeek: repeatFormRef.value.daysOfWeek,
  });

  draftReminder.value!.repeat = valuesToSave;

  remindersStore.saveDraft();
};

const cancelButtonClickHandler = () => {
  remindersStore.cancelEdit();
};

const saveDateTimeButtonClickHandler = () => {
  if (calendarRef.value) {
    calendarRef.value.overlayVisible = false;
  }
};
</script>

<template v-if="!!draftReminder">
  <div class="ReminderEdit">
    <Input
      v-model="draftReminder!.name"
      id="input-name"
      class="ReminderEditItem"
    >
      Название
    </Input>

    <Input
      v-model="draftReminder!.description"
      id="input-description"
      class="ReminderEditItem"
    >
      Описание
    </Input>

    <FloatLabel class="ReminderEditItem" variant="on">
      <label for="input-date-time">
        Дата напоминания
      </label>

      <DatePicker
        ref="calendarRef"
        v-model="draftReminder!.dateTime"
        id="input-date-time"
        dateFormat="dd.mm.yy"
        showTime
        fluid
        showButtonBar
        placeholder="Дата напоминания"
      >
        <template #buttonbar>
          <div class="ButtonBar">
            <Button severity="success" @click="saveDateTimeButtonClickHandler">
              Закрыть
            </Button>
          </div>
        </template>
      </DatePicker>
    </FloatLabel>

    <ItemRepeat v-model="repeatFormRef" />

    <FloatLabel class="ReminderEditItem">
      <label for="input-notifications-minutes-before">
        Напоминать за
      </label>

      <Select
        v-model="draftReminder!.notifications.minutesBefore"
        :options="notificationMinutesBeforeOptions"
        optionLabel="label"
        optionValue="value"
        fluid
        inputId="input-notifications-minutes-before"
      />
    </FloatLabel>

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

  label {
    z-index: 1;
  }
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
