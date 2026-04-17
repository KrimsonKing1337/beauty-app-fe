<script setup lang="ts">

</script>

<template>
  <div class="Background">
    <div class="Blur BlurTop" />
    <div class="Blur BlurBottom" />
  </div>
</template>

<style scoped lang="scss">
.Background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.Blur {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: rgba(217, 142, 161, 0.22);
  filter: blur(80px);
}

.BlurTop {
  top: -100px;
  right: -40px;
}

.BlurBottom {
  bottom: -120px;
  left: -60px;
}
</style>
