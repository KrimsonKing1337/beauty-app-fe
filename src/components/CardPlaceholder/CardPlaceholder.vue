<script setup lang="ts">
import { Card } from '@/components';
</script>

<template>
  <Card class="Wrapper">
    <slot />
  </Card>
</template>

<style scoped lang="scss">
.Wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  font-size: var(--fs-title);
}
</style>
