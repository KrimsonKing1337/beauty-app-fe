import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { ProcedureDraft } from '@/@types';

const createEmptyProcedureCard = (): ProcedureDraft => ({
  id: crypto.randomUUID(),
  procedureName: '',
  date: new Date(),
  place: '',
  duration: '',
  price: 0,
  beforeAfter: [],
  beforeImagePaths: [],
  afterImagePaths: [],
  notes: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useProcedureCardsStore = defineStore('procedureCard', () => {
  const editingCardId = ref<string | null>(null);
  const draftCard = ref<ProcedureDraft | null>(null);
  const lastTouchedCardId = ref<string | null>(null);

  const startCreateCard = () => {
    editingCardId.value = null;
    draftCard.value = createEmptyProcedureCard();
  };

  const startEditCard = (card: ProcedureDraft) => {
    editingCardId.value = card.id;
    draftCard.value = { ...card };
  };

  const cancelEdit = () => {
    lastTouchedCardId.value = editingCardId.value;

    editingCardId.value = null;
    draftCard.value = null;
  };

  const clearDraft = () => {
    editingCardId.value = null;
    draftCard.value = null;
  };

  const setLastTouchedCardId = (id: string | null) => {
    lastTouchedCardId.value = id;
  };

  const duplicateCardDraft = (card: ProcedureDraft) => {
    const duplicatedCard: ProcedureDraft = {
      ...card,
      id: crypto.randomUUID(),
    };

    editingCardId.value = null;
    draftCard.value = duplicatedCard;
  };

  return {
    editingCardId,
    draftCard,
    lastTouchedCardId,
    startCreateCard,
    startEditCard,
    cancelEdit,
    clearDraft,
    setLastTouchedCardId,
    duplicateCardDraft,
  };
});
