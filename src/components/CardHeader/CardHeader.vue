<script setup lang="ts">
import { onMounted, useId } from 'vue';

import type { CardHeaderProps } from './@types.ts';

const props = defineProps<CardHeaderProps>();

const getStyles = (id: string) => {
  if (id === 'delete') {
    return 'color: red';
  }
};

const menuActivatorId = useId();
</script>

<template>
  <div class="CardHeader">
    <div v-if="props.leftTop || props.leftBottom" class="Left">
      <div v-if="props.leftTop" class="Title text-title-large">
        {{ props.leftTop }}
      </div>

      <div v-if="props.leftBottom" class="SubTitle text-body-medium">
        {{ props.leftBottom }}
      </div>
    </div>

    <div v-if="props.rightTop || props.rightBottom" class="Right">
      <div v-if="props.rightTop" class="Title">
        {{ props.rightTop }}
      </div>

      <div v-if="props.rightBottom" class="SubTitle text-body-medium">
        {{ props.rightBottom }}
      </div>
    </div>

    <VBtn
      :id="menuActivatorId"
      class="MenuTrigger"
      variant="text"
      density="comfortable"
      icon="mdi-dots-vertical"
    />

    <VMenu :activator="`#${menuActivatorId}`" offset="10">
      <VList>
        <VListItem
          v-for="itemCur in props.menuItems"
          :key="itemCur.id"
          :title="itemCur.label"
          :style="getStyles(itemCur.id)"
          class="ListItem"

          @click="itemCur.action"
        >
          <template #prepend>
            <VIcon :icon="itemCur.icon" class="mr-2" size="small" />
          </template>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>

<style scoped lang="scss">
.CardHeader {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  max-width: 100%;
}

.Left {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 70%;

  @media (max-width: 480px) {
    width: 50%;
  }
}

.Title {
  margin: 0;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.SubTitle {
  color: var(--text-secondary);
}

.Right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  margin-left: auto;
  margin-right: 25px;
  min-width: 100px;
  width: 30%;
}

.MenuTrigger {
  position: absolute;
  z-index: 1;
  top: -5px;
  right: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
}

.ListItem {
  :deep(.v-list-item__spacer) {
    display: none;
  }
}
</style>
