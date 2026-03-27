<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import {
  type DatePickerState,
  Button,
  DatePicker,
  FloatLabel,
  Select,
  InputNumber,
  Checkbox,
} from 'primevue';

import { useRemindersStore } from '@/stores/remindersStore.ts';

import { Input } from '@/components';
import { repeatStoreToUi, repeatUiToStore } from '@/components/Reminders/utils';

const remindersStore = useRemindersStore();
const { draftReminder } = storeToRefs(remindersStore);

const repeatValues = repeatStoreToUi(draftReminder.value!.repeat);

const repeatOptions = [
  { label: 'Не повторять', value: 'none' },
  { label: 'Каждый день', value: 'daily' },
  { label: 'Каждую неделю', value: 'weekly' },
  { label: 'Дни недели', value: 'daysOfWeek' },
  { label: 'Каждый месяц', value: 'monthly' },
  { label: 'Каждый год', value: 'yearly' },
  { label: 'Другое', value: 'custom' },
];

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

const repeatCustomUnitOptions = [
  { label: 'День', value: 'day' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
  { label: 'Год', value: 'year' },
];

const daysOfWeekOptions = [
  { label: 'Понедельник', value: 1 },
  { label: 'Вторник', value: 2 },
  { label: 'Среда', value: 3 },
  { label: 'Четверг', value: 4 },
  { label: 'Пятница', value: 5 },
  { label: 'Суббота', value: 6 },
  { label: 'Воскресенье', value: 7 },
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

const reminderEditItemRepeatIsActive = computed(() => {
  return repeatFormRef.value.repeat === 'daysOfWeek' || repeatFormRef.value.repeat === 'custom';
});
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

    <div
      class="ReminderEditItem ReminderEditItemRepeat"
      :class="{ isActive: reminderEditItemRepeatIsActive }"
    >
      <FloatLabel variant="on">
        <label for="input-repeat">
          Повторять
        </label>

        <Select
          v-model="repeatFormRef.repeat"
          :options="repeatOptions"
          optionLabel="label"
          optionValue="value"
          fluid
          inputId="input-repeat"
        />
      </FloatLabel>

      <div v-if="repeatFormRef.repeat === 'daysOfWeek'">
        <div v-for="dayCur of daysOfWeekOptions" :key="dayCur.value">
          <Checkbox
            v-model="repeatFormRef.daysOfWeek"
            :inputId="`input-repeat-days-of-week-${dayCur.value}`"
            name="category"
            :value="dayCur.value"
          />

          <label :for="`input-repeat-days-of-week-${dayCur.value}`">
            {{ dayCur.label }}
          </label>
        </div>
      </div>

      <div v-if="repeatFormRef.repeat === 'custom'" class="ReminderEditItemNumbersWrapper">
        <FloatLabel variant="on">
          <label for="input-repeat-custom-unit">
            Единица времени
          </label>

          <Select
            v-model="repeatFormRef.customUnit"
            :options="repeatCustomUnitOptions"
            optionLabel="label"
            optionValue="value"
            fluid
            inputId="input-repeat-custom-unit"
          />
        </FloatLabel>

        <FloatLabel variant="on">
          <label for="input-repeat-custom-interval">
            Количество
          </label>

          <InputNumber
            v-model="repeatFormRef.customInterval"
            inputId="input-repeat-custom-interval"
            showButtons
            :min="0"
            :max="999"
            :allowEmpty="false"
          />
        </FloatLabel>
      </div>
    </div>

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

.ReminderEditItemSibling {
  margin-top: var(--space-12);
}

.ReminderEditItemRepeat {
  border: 0 transparent solid;
  border-radius: 12px;
  padding: 0;
  transition: border 0.2s, padding 0.2s;

  &.isActive {
    border: 1px #ccc solid;
    padding: 20px;
  }
}

.ReminderEditItemNumbersWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: var(--space-24);
}

.ReminderEditItemNumber {
  width: 16.5%;

  &:global(.p-inputnumber),
  &:global(.p-inputtext) {
    width: 100%;
  }

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
