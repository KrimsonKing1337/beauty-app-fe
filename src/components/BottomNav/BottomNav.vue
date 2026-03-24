<script setup lang="ts">
import { Button } from 'primevue';
</script>

<template>
 <nav class="BottomNav">
   <div class="BottomNavInner">
     <Button class="BottomNavItem isActive">
       Процедуры
     </Button>

     <Button class="BottomNavItem">
       Напоминания
     </Button>

     <Button class="BottomNavItem">
       <i class="pi pi-plus"/>
     </Button>
   </div>
 </nav>
</template>

<style scoped lang="scss">
.BottomNav {
  position: sticky;
  bottom: 12px;
  z-index: 10;
  margin-top: 24px;
}

.BottomNavInner {
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

.BottomNavItem {
  height: 52px;
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
