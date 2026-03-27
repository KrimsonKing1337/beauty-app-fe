<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { Button } from 'primevue';

import { useProcedureCardsStore } from '@/stores/procedureCardsStore';
import { useRemindersStore } from '@/stores/remindersStore';

const router = useRouter();
const route = useRoute();

const procedureCardsStore = useProcedureCardsStore();
const remindersStore = useRemindersStore();

const buttonProceduresClickHandler = () => {
  router.push('/');
};

const buttonRemindersClickHandler = () => {
  router.push('/reminders');
};

const buttonCreateClickHandler = () => {
  if (route.path === '/reminders') {
    remindersStore.startCreateReminder();
  } else {
    procedureCardsStore.startCreateCard();
  }
}
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

     <Button class="Item" @click="buttonCreateClickHandler">
       <i class="pi pi-plus" />
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

  &:nth-last-child(1) {
    margin-left: auto;
    border-color: transparent;
  }

  &.isActive {
    background: var(--accent-soft);
    color: #8e4e61;
  }
}
</style>
