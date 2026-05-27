import type { InjectionKey, Ref } from 'vue';

import type { Procedure } from '@/@types';

export type ProcedureCardsContext = {
  cards: Ref<Procedure[]>;
};

export const procedureCardsContextKey =
  Symbol('procedureCardsContext') as InjectionKey<ProcedureCardsContext>;
