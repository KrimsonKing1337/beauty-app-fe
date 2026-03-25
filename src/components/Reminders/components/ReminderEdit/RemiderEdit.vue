<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { type DatePickerState, Button, DatePicker, FloatLabel } from 'primevue';

import { useRemindersStore } from '@/stores/remindersStore.ts';

import { Input } from '@/components';

const remindersStore = useRemindersStore();
const { draftReminder } = storeToRefs(remindersStore);

const calendarRef = ref<DatePickerState | null>(null);

const saveButtonClickHandler = () => {
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
  <div class="ProcedureCardEdit" id="test">
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

    <FloatLabel class="ReminderEditItem isDatepicker">
      <label for="input-date-time">
        Дата
      </label>

      <DatePicker
        ref="calendarRef"
        v-model="draftReminder!.dateTime"
        id="input-date-time"
        dateFormat="dd-mm-yy"
        showTime
        fluid
        showButtonBar
        placeholder="Дата"
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
}

.ReminderEditItem {
  margin-top: var(--space-32);

  &.isDatepicker {
    span {
      width: 100%;
    }
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
