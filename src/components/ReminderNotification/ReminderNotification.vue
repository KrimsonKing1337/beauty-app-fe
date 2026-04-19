<script setup lang="ts">
type Props = {
  title: string;
  description?: string | null;
  scheduledLabel: string;
  overdueLabel?: string | null;
  isOverdue?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  description: null,
  overdueLabel: null,
  isOverdue: false,
});

const emit = defineEmits<{
  complete: [];
  snooze: [];
  open: [];
  close: [];
}>();
</script>

<template>
  <div class="ReminderNotification" :class="{ isOverdue: props.isOverdue }">
    <div class="Header">
      <div class="Main">
        <div class="TitleRow">
          <h4 class="Title">
            {{ props.title }}
          </h4>

          <span v-if="props.isOverdue && props.overdueLabel" class="Badge">
            {{ props.overdueLabel }}
          </span>
        </div>

        <p v-if="props.description" class="Description">
          {{ props.description }}
        </p>
      </div>

      <button
        type="button"
        class="CloseButton"
        aria-label="Закрыть уведомление"
        @click="emit('close')"
      >
        ×
      </button>
    </div>

    <div class="Footer">
      <div class="Meta">
        <span class="Time">
          {{ props.scheduledLabel }}
        </span>
      </div>

      <div class="Actions">
        <button
          type="button"
          class="ActionButton ActionButton_Secondary"
          @click="emit('snooze')"
        >
          Отложить
        </button>

        <button
          type="button"
          class="ActionButton ActionButton_Ghost"
          @click="emit('open')"
        >
          Открыть
        </button>

        <button
          type="button"
          class="ActionButton ActionButton_Primary"
          @click="emit('complete')"
        >
          Завершить
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ReminderNotification {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 360px;
  max-width: calc(100vw - 24px);
  padding: 14px;
  border: 1px solid #e7d7d7;
  border-radius: 18px;
  background: #ffffff;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.08),
    0 2px 10px rgba(0, 0, 0, 0.04);

  &.isOverdue {
    border-color: #efb7b7;
    background: #fff8f8;
  }
}

.Header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.Main {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.TitleRow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.Title {
  margin: 0;
  overflow: hidden;
  color: #1f1f1f;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.Badge {
  flex-shrink: 0;
  padding: 4px 8px;
  border-radius: 999px;
  background: #f6d6d6;
  color: #9f3d3d;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}

.Description {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.35;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.CloseButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  min-width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #6b7280;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.CloseButton:hover {
  background: rgba(0, 0, 0, 0.06);
  color: #1f1f1f;
}

.Footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.Meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.Time {
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
}

.Actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ActionButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    opacity 0.2s ease,
    background-color 0.2s ease;
}

.ActionButton:hover {
  transform: translateY(-1px);
}

.ActionButton_Primary {
  background: #1f1f1f;
  color: #ffffff;
}

.ActionButton_Secondary {
  background: #f3f4f6;
  color: #1f1f1f;
}

.ActionButton_Ghost {
  background: transparent;
  color: #4b5563;
}

.ActionButton_Ghost:hover {
  background: #f9fafb;
}

@media (max-width: 480px) {
  . {
    width: 100%;
    padding: 12px;
    border-radius: 16px;
  }

  .Actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .ActionButton_Primary {
    grid-column: 1 / -1;
  }
}
</style>
