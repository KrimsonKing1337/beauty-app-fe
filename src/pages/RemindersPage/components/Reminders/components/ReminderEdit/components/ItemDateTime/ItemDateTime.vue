<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  modelValue?: Date | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date): void;
}>();

const initialDate = props.modelValue ? new Date(props.modelValue) : new Date();

const hours = initialDate.getHours().toString().padStart(2, '0');
const minutes = initialDate.getMinutes().toString().padStart(2, '0');
const time = `${hours}:${minutes}`;

const dateModel = ref<Date>(initialDate);
const timeModel = ref<string>(time);

const dateTime = computed(() => {
  const [hours = 0, minutes = 0] = timeModel.value.split(':').map(Number);

  const result = new Date(dateModel.value);
  result.setHours(hours, minutes, 0, 0);

  return result;
});

watch(
  dateTime,
  (value) => {
    emit('update:modelValue', value);
  },
  { immediate: true },
);

const firstTouch = ref(false);

const title = computed(() => {
  const date = dateTime.value.toLocaleDateString();
  const time = dateTime.value.toLocaleTimeString();
  const dateWithTime = `${date} ${time}`;

  if (firstTouch.value) {
    return dateWithTime;
  }

  return 'Дата и время напоминания';
});
</script>

<template>
  <VExpansionPanels class="DatePicker">
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
          variant="outlined"
          color="pink-lighten-4"
          width="100%"
          first-day-of-week="1"
          header-date-format="normalDateWithWeekday"
          hide-title
          rounded="lg"
          @click="firstTouch = true"
        />

        <VTimePicker
          v-model="timeModel"
          format="24hr"
          color="pink-lighten-3"
          bg-color="#fff"
          hide-title
          theme="light"
          class="TimePicker"
          @click="firstTouch = true"
        />
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>

<style scoped lang="scss">
.TimePicker {
  :deep(.v-time-picker-clock) {
    background-color: #f8bbd0; // pink-lighten-4
  }

  :deep(.v-time-picker-controls__time__field .v-field) {
    background-color: #f8bbd0; // pink-lighten-4
    color: #000;
  }
}
</style>
