<script setup lang="ts">
import { Button } from 'primevue';

import { useRouter, useRoute } from 'vue-router';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore';
import { useRemindersStore } from '@/stores/remindersStore';

const router = useRouter();
const route = useRoute();

const procedureCardsStore = useProcedureCardsStore();
const remindersStore = useRemindersStore();

const buttonProceduresClickHandler = async () => {
  await router.push('/');
};

const buttonRemindersClickHandler = async () => {
  await router.push('/reminders');
};

const buttonCalendarClickHandler = async () => {
  await router.push('/calendar');
};

const buttonCreateClickHandler = () => {
  if (route.path === '/reminders') {
    remindersStore.startCreateReminder();
  } else {
    procedureCardsStore.startCreateCard();
  }
};
</script>

<template>
  <nav class="BottomNav">
    <div class="Inner">
      <Button
        class="Item"
        :class="{ isActive: route.path === '/' }"
        @click="buttonProceduresClickHandler"
      >
        Процедуры
      </Button>

      <Button
        class="Item"
        :class="{ isActive: route.path === '/reminders' }"
        @click="buttonRemindersClickHandler"
      >
        Напоминания
      </Button>

      <Button
        class="Item"
        :class="{ isActive: route.path === '/calendar' }"
        @click="buttonCalendarClickHandler"
      >
        Календарь
      </Button>

      <Button v-if="route.path !== '/calendar'" class="Item CreateButton" @click="buttonCreateClickHandler">
        <i class="pi pi-plus"></i>
      </Button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.BottomNav {
  position: sticky;
  width: 90%;
  bottom: 12px;
  z-index: 10;
  margin: auto auto 0 auto;
  padding-top: 20px;
}

.Inner {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(236, 227, 231, 0.9);
  backdrop-filter: blur(16px);
  border-radius: 22px;
  box-shadow: var(--shadow);
}

.Item {
  height: 32px;
  min-width: 52px;
  border-radius: 16px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;

  &.isActive {
    background: var(--accent-soft);
    color: #8e4e61;
  }

  &.CreateButton {
    margin-left: auto;
    border-color: transparent;
  }
}
</style>
