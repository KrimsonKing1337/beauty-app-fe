<script setup lang="ts">

</script>

<template>
  <div class="BeforeAfter">
    <div class="BeforeAfterItem">
      <div class="BeforeAfterLabel">
        До
      </div>

      <div class="BeforeAfterImage">
        <div class="BeforeAfterImagePlaceholder">
          Фото до
        </div>
      </div>
    </div>

    <div class="BeforeAfterItem">
      <div class="BeforeAfterLabel">
        После
      </div>

      <div class="BeforeAfterImage">
        <div class="BeforeAfterImagePlaceholder">
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

.BeforeAfterItem {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.BeforeAfterLabel {
  font-size: var(--fs-caption);
  color: var(--text-secondary);
  font-weight: var(--fw-medium);
}

.BeforeAfterImage {
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

.BeforeAfterImagePlaceholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: var(--text-tertiary);
  font-size: var(--fs-caption);
}
</style>
