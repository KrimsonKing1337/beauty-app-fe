<script setup lang="ts">
const notificationMinutesBeforeOptions = [
  { title: '0 минут', value: 0 },
  { title: '5 минут', value: 5 },
  { title: '15 минут', value: 15 },
  { title: '30 минут', value: 30 },
  { title: '60 минут', value: 60 },
  { title: '2 часа', value: 120 },
  { title: '3 часа', value: 180 },
  { title: '4 часа', value: 240 },
];

const model = defineModel<number>({ required: true });
</script>

<template>
  <VSelect
    v-model="model"
    :items="notificationMinutesBeforeOptions"
    label="Напоминать за"
    variant="outlined"
    bg-color="#fff"
    rounded="lg"
  />
</template>

<style scoped lang="scss">
.ReminderEditItemMinutesBefore {
  margin-top: 32px;

  label {
    z-index: 1;
  }
}
</style>
