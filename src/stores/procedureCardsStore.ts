import { ref } from 'vue';

import { defineStore } from 'pinia';

import type { Procedure, ProcedureDraft } from '@/@types';

const createEmptyProcedureCard = (): ProcedureDraft => ({
  procedureName: '',
  dateTime: new Date(),
  placeId: null,
  durationHours: 0,
  durationMinutes: 0,
  price: 0,
  images: [],
  notes: '',
  typeId: null,
  tagIds: [],
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

  const startEditCard = (card: Procedure) => {
    editingCardId.value = card.id;

    draftCard.value = {
      ...card,
      dateTime: new Date(card.dateTime),
      images: card.images.map((image) => ({ ...image })),
      tagIds: [...card.tagIds],
    };
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

  const duplicateCardDraft = (card: Procedure) => {
    const duplicatedCard: ProcedureDraft = {
      ...card,
      dateTime: new Date(card.dateTime),
      images: card.images.map((imageCur) => ({
        id: '',
        path: imageCur.path,
        label: imageCur.label,
      })),
      tagIds: [...card.tagIds],
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
