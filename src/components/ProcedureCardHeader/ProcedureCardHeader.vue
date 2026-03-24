<script setup lang="ts">
import { ref } from 'vue';

import { Button, Menu } from 'primevue';

import type { ProcedureCardHeaderProps } from './ProcedureCardHeader.types.ts';

const props = defineProps<ProcedureCardHeaderProps>();

const menu = ref();

const menuItems = ref([
  {
    label: 'Редактировать',
    icon: 'pi pi-pencil',
  },
  {
    label: 'Дублировать',
    icon: 'pi pi-clone',
  },
  {
    label: 'Удалить',
    icon: 'pi pi-trash',
    class: 'ProcedureCardHeaderMenuDelete',
  },
]);

const menuTriggerClickHandler = (e: MouseEvent) => {
  menu.value.toggle(e);
};
</script>

<template>
  <div class="ProcedureCardHeader">
    <div class="ProcedureCardHeaderTitleWrapper">
      <h2 class="ProcedureCardHeaderTitle">
        {{ props.title }}
      </h2>

      <div class="ProcedureCardHeaderMeta">
        {{ props.meta }}
      </div>
    </div>

    <div class="ProcedureCardHeaderPrice">
      {{ props.price }}
    </div>

    <Button
      class="ProcedureCardHeaderMenuTrigger"
      icon="pi pi-ellipsis-v"
      ariaHaspopup="true"
      ariaControls="procedureCardHeaderMenu"
      @click="menuTriggerClickHandler"
    />

    <Menu
      ref="menu"
      id="procedureCardHeaderMenu"
      :model="menuItems"
      :popup="true"
    />
  </div>
</template>

<style scoped lang="scss">
.ProcedureCardHeader {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
}

.ProcedureCardHeaderTitleWrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.ProcedureCardHeaderTitle {
  margin: 0;
  font-size: var(--fs-title);
  line-height: var(--lh-title);
  font-weight: var(--fw-semibold);
}

.ProcedureCardHeaderMeta {
  font-size: var(--fs-caption);
  line-height: var(--lh-caption);
  color: var(--text-secondary);
}

.ProcedureCardHeaderPrice {
  white-space: nowrap;
  font-size: var(--fs-title);
  font-weight: var(--fw-semibold);
  margin-left: auto;
  margin-right: 20px;
}

.ProcedureCardHeaderMenuTrigger {
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
.ProcedureCardHeaderMenuDelete {
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
