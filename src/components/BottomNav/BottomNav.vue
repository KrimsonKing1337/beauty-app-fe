<script setup lang="ts">
const props = defineProps<{
  isActive?: boolean;
}>();
</script>

<template>
 <nav class="BottomNav" :class="{ isActive: props.isActive }">
   <div class="BottomNavInner">
     <button class="BottomNavItem">
       Кнопка один
     </button>

     <button class="BottomNavItem">
       Кнопка два
     </button>

     <button class="BottomNavItem">
       Кнопка три
     </button>
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(236, 227, 231, 0.9);
  backdrop-filter: blur(16px);
  border-radius: 22px;
  box-shadow: var(--shadow);
}

.BottomNavItem {
  min-height: 52px;
  border-radius: 16px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;

  &.isActive {
    background: var(--accent-soft);
    color: #8e4e61;
  }
}
</style>
