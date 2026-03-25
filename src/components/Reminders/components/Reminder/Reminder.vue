<script setup lang="ts">
import type { Reminder } from '@/stores/remindersStore.ts';

import { Card } from '@/components';
import { Header } from './components';

const props = defineProps<{
  reminder: Reminder;
}>();
</script>

<template>
  <Card :isArchived="reminder.isArchived" :isCompleted="reminder.isCompleted">
    <Header :reminder="props.reminder" />
  </Card>
</template>

<style scoped lang="scss">

</style>
