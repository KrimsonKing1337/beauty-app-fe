<script setup lang="ts">
import { ref } from 'vue';
import { Button, Menu } from 'primevue';

import type { CardHeaderProps } from './CardHeader.types.ts';

const props = defineProps<CardHeaderProps>();

const menuRef = ref();

const menuTriggerClickHandler = (e: MouseEvent) => {
  menuRef.value.toggle(e);
};
</script>

<template>
  <div class="CardHeader">
    <div v-if="props.leftTop || props.leftBottom" class="Left">
      <h2 v-if="props.leftTop" class="Title">
        {{ props.leftTop }}
      </h2>

      <div v-if="props.leftBottom" class="SubTitle">
        {{ props.leftBottom }}
      </div>
    </div>

    <div v-if="props.rightTop || props.rightBottom" class="Right">
      <h2 v-if="props.rightTop" class="Title">
        {{ props.rightTop }}
      </h2>

      <div v-if="props.rightBottom" class="SubTitle">
        {{ props.rightBottom }}
      </div>
    </div>

    <Button
      class="MenuTrigger"
      icon="pi pi-ellipsis-v"
      ariaHaspopup="true"
      ariaControls="CardHeaderMenu"
      @click="menuTriggerClickHandler"
    />

    <Menu
      ref="menuRef"
      id="CardHeaderMenu"
      :model="props.menuItems"
      :popup="true"
    />
  </div>
</template>

<style scoped lang="scss">
.CardHeader {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
}

.Left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.Title {
  margin: 0;
  font-size: var(--fs-title);
  line-height: var(--lh-title);
  font-weight: var(--fw-semibold);
}

.SubTitle {
  font-size: var(--fs-caption);
  line-height: var(--lh-caption);
  color: var(--text-secondary);
}

.Right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  margin-left: auto;
  margin-right: 20px;
}

.MenuTrigger {
  position: absolute;
  z-index: 1;
  top: -5px;
  right: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  width: 24px;
  height: 32px;
  font-size: 32px;
  color: var(--text-primary);
  background: transparent;
  border-color: transparent;
  cursor: pointer;
}
</style>

<style lang="scss">
.MenuDeleteButton {
  .p-menu-item-content {
    background-color: var(--p-red-500);

    &:hover {
      .p-menu-item-icon,
      .p-menu-item-label {
        color: var(--p-navigation-item-icon-focus-color);
      }
    }
  }

  .p-menu-item-icon,
  .p-menu-item-label {
    color: var(--p-red-50);
  }
}
</style>
