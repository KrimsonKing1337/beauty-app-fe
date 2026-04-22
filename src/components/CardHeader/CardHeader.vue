<script setup lang="ts">
import type { CardHeaderProps } from './@types.ts';

const props = defineProps<CardHeaderProps>();

const getStyles = (id: string) => {
  if (id === 'delete') {
    return 'color: red';
  }
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

    <VBtn
      id="menu-activator"
      class="MenuTrigger"
      variant="text"
      density="comfortable"
      icon="mdi-dots-vertical"
    />

    <VMenu activator="#menu-activator" offset="10">
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
  margin-right: 25px;
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
