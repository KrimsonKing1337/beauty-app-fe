<script setup lang="ts">
import { ref } from 'vue';
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

import type { RepeatPreset } from '@/components/Reminders/@types.ts';
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

const repeatOptions = [
  { label: 'Не повторять', value: 'none' },
  { label: 'Каждый день', value: 'daily' },
  { label: 'Каждую неделю', value: 'weekly' },
  { label: 'Дни недели', value: 'daysOfWeek' },
  { label: 'Каждый месяц', value: 'monthly' },
  { label: 'Каждый год', value: 'yearly' },
  { label: 'Другое', value: 'custom' },
];

type NotificationMinutesBeforeOption = {
  label: string;
  value: number;
};

const notificationMinutesBeforeOptions: NotificationMinutesBeforeOption[] = [
  { label: 'Не напоминать', value: 0 },
  { label: '5 минут', value: 5 },
  { label: '15 минут', value: 15 },
  { label: '30 минут', value: 30 },
  { label: '60 минут', value: 60 },
  { label: '2 часа', value: 120 },
  { label: '3 часа', value: 180 },
  { label: '4 часа', value: 240 },
];

const repeatRef = ref<RepeatPreset>('none');

type RepeatCustomOption = {
  label: string;
  value: number;
};

const repeatCustomRef = ref<Record<string, RepeatCustomOption>>({
  years: { label: 'Лет', value: 0 },
  months: { label: 'Месяцев', value: 0 },
  weeks: { label: 'Недель', value: 0 },
  days: { label: 'Дней', value: 0 },
  hours: { label: 'Часов', value: 0 },
  minutes: { label: 'Минут', value: 0 },
});

const repeatCustomOptions = Object.keys(repeatCustomRef.value);

const daysOfWeek = [
  { label: 'Понедельник', value: 1 },
  { label: 'Вторник', value: 2 },
  { label: 'Среда', value: 3 },
  { label: 'Четверг', value: 4 },
  { label: 'Пятница', value: 5 },
  { label: 'Суббота', value: 6 },
  { label: 'Воскресенье', value: 7 },
];

const daysOfWeekRef = ref<number[]>([]);
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

    <!-- отображать стили только если выбраны "дни недели" или "другое" -->
    <div style="border: 1px #ccc solid; padding: 20px;" class="ReminderEditItem">
      <FloatLabel variant="on">
        <label for="input-repeat">
          Повторять
        </label>

        <Select
          v-model="repeatRef"
          :options="repeatOptions"
          optionLabel="label"
          optionValue="value"
          fluid
          inputId="input-repeat"
        />
      </FloatLabel>

      <div v-if="repeatRef === 'daysOfWeek'">
        <div v-for="dayCur of daysOfWeek" :key="dayCur.value">
          <Checkbox
            v-model="daysOfWeekRef"
            :inputId="`daysOfWeek-${dayCur.value}`"
            name="category"
            :value="dayCur.value" />
          <label :for="`daysOfWeek-${dayCur.value}`">
            {{ dayCur.label }}
          </label>
        </div>
      </div>

      <div v-if="repeatRef === 'custom'" class="ReminderEditItemNumbersWrapper">
        Ведите количество

        <div
          v-for="optionCur of repeatCustomOptions"
          :key="optionCur"
          class="ReminderEditItemNumber"
        >
          <FloatLabel variant="on">
            <label :for="`input-repeat-custom-${optionCur}`">
              {{ repeatCustomRef[optionCur]!.label }}
            </label>

            <InputNumber
              v-model="repeatCustomRef[optionCur]!.value"
              :inputId="`input-repeat-custom-${optionCur}`"
              showButtons
              :min="0"
              :max="999"
              :allowEmpty="false"
            />
          </FloatLabel>
        </div>
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
