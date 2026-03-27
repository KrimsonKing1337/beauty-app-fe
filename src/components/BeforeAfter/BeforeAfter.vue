<script setup lang="ts">

</script>

<template>
  <div class="BeforeAfter">
    <div class="Item">
      <div class="Label">
        До
      </div>

      <div class="Image">
        <div class="ImagePlaceholder">
          Фото до
        </div>
      </div>
    </div>

    <div class="Item">
      <div class="Label">
        После
      </div>

      <div class="Image">
        <div class="ImagePlaceholder">
          Фото после
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.BeforeAfter {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.Item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.Label {
  font-size: var(--fs-caption);
  color: var(--text-secondary);
  font-weight: var(--fw-medium);
}

.Image {
  aspect-ratio: 4 / 5;
  border-radius: 18px;
  overflow: hidden;
  background: var(--surface-muted);
  border: 1px solid var(--border);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.ImagePlaceholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--text-tertiary);
  font-size: var(--fs-caption);
}
</style>
