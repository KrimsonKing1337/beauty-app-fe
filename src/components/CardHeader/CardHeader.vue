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
    <div v-if="props.leftTop || props.leftBottom" class="CardHeaderLeft">
      <h2 v-if="props.leftTop" class="CardHeaderTitle">
        {{ props.leftTop }}
      </h2>

      <div v-if="props.leftBottom" class="CardHeaderSubTitle">
        {{ props.leftBottom }}
      </div>
    </div>

    <div v-if="props.rightTop || props.rightBottom" class="CardHeaderRight">
      <h2 v-if="props.rightTop" class="CardHeaderTitle">
        {{ props.rightTop }}
      </h2>

      <div v-if="props.rightBottom" class="CardHeaderSubTitle">
        {{ props.rightBottom }}
      </div>
    </div>

    <Button
      class="CardHeaderMenuTrigger"
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

.CardHeaderLeft {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.CardHeaderTitle {
  margin: 0;
  font-size: var(--fs-title);
  line-height: var(--lh-title);
  font-weight: var(--fw-semibold);
}

.CardHeaderSubTitle {
  font-size: var(--fs-caption);
  line-height: var(--lh-caption);
  color: var(--text-secondary);
}

.CardHeaderRight {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  margin-left: auto;
  margin-right: 20px;
}

.CardHeaderMenuTrigger {
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
