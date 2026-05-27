import type { InjectionKey, Ref } from 'vue';

import type { Reminder } from '@/@types';

export type ReminderCardsContext = {
  cards: Ref<Reminder[]>;
};

export const reminderCardsContextKey =
  Symbol('reminderCardsContext') as InjectionKey<ReminderCardsContext>;
