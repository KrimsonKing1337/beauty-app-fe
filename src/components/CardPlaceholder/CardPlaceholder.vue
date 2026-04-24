<script setup lang="ts">
import { Card } from '@/components';
</script>

<template>
  <Card class="Wrapper text-title-large">
    <slot />
  </Card>
</template>

<style scoped lang="scss">
.Wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
}
</style>
