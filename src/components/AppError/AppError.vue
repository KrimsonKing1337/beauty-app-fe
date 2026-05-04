<script setup lang="ts">
type Props = {
  title?: string;
  message?: string | null;
};

withDefaults(defineProps<Props>(), {
  title: 'Не удалось загрузить данные',
  message: 'Попробуйте обновить страницу или повторить действие позже',
});

const emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <div class="AppError">
    <VIcon
      class="Icon"
      icon="mdi-alert-circle-outline"
      size="32"
    />

    <div class="Content">
      <div class="Title">
        {{ title }}
      </div>

      <div class="Message">
        {{ message }}
      </div>

      <VBtn
        class="Button"
        variant="tonal"
        rounded="lg"
        size="small"
        @click="emit('retry')"
      >
        Повторить
      </VBtn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.AppError {
  display: flex;
  gap: 14px;
  width: 100%;
  padding: 16px;
  border: 1px solid rgba(211, 122, 122, 0.28);
  border-radius: 20px;
  background: rgba(211, 122, 122, 0.08);
}

.Icon {
  color: #d37a7a;
}

.Content {
  flex: 1;
}

.Title {
  font-weight: 700;
  color: var(--text-primary);
}

.Message {
  margin-top: 4px;
  color: var(--text-secondary);
}

.Button {
  margin-top: 12px;
}
</style>
