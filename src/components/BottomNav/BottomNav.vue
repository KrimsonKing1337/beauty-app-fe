<script setup lang="ts">
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

const buttons = [
  {
    id: 'procedures',
    label: 'Процедуры',
    path: '/',
    click: buttonProceduresClickHandler,
  },
  {
    id: 'reminders',
    label: 'Напоминания',
    path: '/reminders',
    click: buttonRemindersClickHandler,
  },
  {
    id: 'calendar',
    label: 'Календарь',
    path: '/calendar',
    click: buttonCalendarClickHandler,
  },
];
</script>

<template>
  <nav class="BottomNav">
    <div class="Inner">
      <VBtn
        v-for="buttonCur in buttons"
        :key="buttonCur.id"
        class="Item"
        :class="{ isActive: route.path === buttonCur.path }"
        :color="route.path === buttonCur.path ? 'pink-lighten-3' : 'pink-lighten-5'"
        @click="buttonCur.click"
      >
        {{ buttonCur.label }}
      </VBtn>

      <VBtn
        v-if="route.path !== '/calendar'"
        class="Item CreateButton"
        :class="{ isActive: route.path === '/calendar' }"
        color="pink-lighten-3"
        @click="buttonCreateClickHandler"
      >
        <VIcon icon="mdi-plus" />
      </VBtn>
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
  color: #000;
  cursor: pointer;

  &.isActive {
    color: #fff;
  }

  &.CreateButton {
    margin-left: auto;
    border-color: transparent;
    color: #fff;
  }
}
</style>
