<script setup lang="ts">
import { computed } from 'vue';

import type { ReminderDue } from '@/pages/RemindersPage/components/Reminders/utils';

type Props = {
  id: string;
  title: string;
  description?: string | null;
  scheduledLabel: string;
  dueLabel?: string | null;
  due: ReminderDue;
};

const props = withDefaults(defineProps<Props>(), {
  description: null,
  dueLabel: null,
});

const emit = defineEmits<{
  complete: [id: string];
  snooze: [id: string];
  open: [id: string];
  close: [id: string];
}>();

const dueLabelShow = computed(() => {
  return props.dueLabel && props.due === 'isPast';
});

const timeLabel = computed(() => {
  if (props.due === 'isPast') {
    return props.scheduledLabel;
  }

  if (props.due === 'isTimeToNotify') {
    return props.dueLabel;
  }

  return '';
});

const cssClassIsOverdue = computed(() => {
  return props.due === 'isPast';
});

const cssClassIsNow = computed(() => {
  return props.due === 'isNow';
});
</script>

<template>
  <div
    class="ReminderNotification"
    :class="{ isOverdue: cssClassIsOverdue, isNow: cssClassIsNow }"
  >
    <div class="Header">
      <div class="Main">
        <div class="TitleRow">
          <h4 class="Title">
            {{ props.title }}
          </h4>

          <span v-if="dueLabelShow" class="Badge">
            {{ props.dueLabel }}
          </span>
        </div>

        <p v-if="props.description" class="Description">
          {{ props.description }}
        </p>
      </div>

      <button
        v-if="props.due === 'isTimeToNotify'"
        type="button"
        class="CloseButton"
        aria-label="Закрыть уведомление"
        @click="emit('close', props.id)"
      >
        ×
      </button>
    </div>

    <div class="Footer">
      <div class="Meta">
        <span class="Time">
          {{ timeLabel }}
        </span>
      </div>

      <div class="Actions">
        <VBtn
          color="pink-lighten-5"
          rounded="lg"
          @click="emit('snooze', props.id)"
        >
          Отложить
        </VBtn>

        <VBtn
          rounded="lg"
          @click="emit('open', props.id)"
        >
          Открыть
        </VBtn>

        <VBtn
          rounded="lg"
          color="pink-lighten-3"
          style="color: #fff;"
          @click="emit('complete', props.id)"
        >
          Завершить
        </VBtn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ReminderNotification {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 365px;
  max-width: calc(100vw - 24px);
  padding: 14px;
  font-size: 15px;
  border: 1px solid #e7d7d7;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08),
  0 2px 10px rgba(0, 0, 0, 0.04);

  &.isOverdue {
    border-color: #F44336; // red
    background: #FF8A80; // red-accent-1
  }

  &.isNow {
    border-color: #4CAF50; // green
    background-color: #81C784; // green-lighten-2
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
  margin: 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.35;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.CloseButton {
  border: 1px red solid;
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
  transition: background-color 0.2s ease,
  color 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
    color: #1f1f1f;
  }
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
</style>
