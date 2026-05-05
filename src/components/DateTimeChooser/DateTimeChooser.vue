<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  modelValue?: Date | string | null;
  placeholder?: string;
  showValueInitially?: boolean;
}>(), {
  placeholder: 'Дата и время',
  showValueInitially: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void;
}>();

const toDate = (value?: Date | string | null): Date => {
  if (!value) {
    return new Date();
  }

  return new Date(value);
};

const toTimeString = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

const dateModel = ref<Date>(toDate(props.modelValue));
const timeModel = ref<string>(toTimeString(dateModel.value));
const firstTouch = ref(false);

const dateTime = computed(() => {
  const [hours = 0, minutes = 0] = timeModel.value.split(':').map(Number);

  const result = new Date(dateModel.value);

  result.setHours(hours, minutes, 0, 0);

  return result;
});

const title = computed(() => {
  if (!firstTouch.value && !props.showValueInitially) {
    return props.placeholder;
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
    .format(dateTime.value)
    .replace(' г.', '');
});

const markTouched = () => {
  firstTouch.value = true;
};

watch(
  () => props.modelValue,
  (value) => {
    const nextDate = toDate(value);

    if (nextDate.getTime() === dateTime.value.getTime()) {
      return;
    }

    dateModel.value = nextDate;
    timeModel.value = toTimeString(nextDate);
  },
);

watch(dateTime, (value) => {
  emit('update:modelValue', value);
});
</script>

<template>
  <VExpansionPanels class="DateTimeChooser">
    <VExpansionPanel rounded="lg">
      <VExpansionPanelTitle>
        <VIcon icon="mdi-calendar" class="mr-2" />

        <span>
          {{ title }}
        </span>
      </VExpansionPanelTitle>

      <VExpansionPanelText>
        <VDatePicker
          v-model="dateModel"
          class="DatePicker"
          variant="outlined"
          color="pink-lighten-4"
          width="100%"
          first-day-of-week="1"
          header-date-format="normalDateWithWeekday"
          hide-title
          rounded="lg"
          @update:model-value="markTouched"
          @click="markTouched"
        />

        <VTimePicker
          v-model="timeModel"
          format="24hr"
          color="pink-lighten-3"
          bg-color="#fff"
          hide-title
          theme="light"
          class="TimePicker"
          @update:model-value="markTouched"
          @click="markTouched"
        />
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped lang="scss">
.DateTimeChooser {
  margin-bottom: 25px;

  &:deep(.v-input__details) {
    display: none;
  }

  :deep(.v-expansion-panel-text__wrapper) {
    @media (max-width: 400px) {
      padding: 5px;
    }
  }
}

.TimePicker {
  :deep(.v-time-picker-clock) {
    background-color: #f8bbd0;
  }

  :deep(.v-time-picker-controls__time__field .v-field) {
    background-color: #f8bbd0;
    color: #000;
  }
}
</style>
