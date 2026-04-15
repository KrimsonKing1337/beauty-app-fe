import { ref } from 'vue';
import { defineStore } from 'pinia';

export type ProcedureCard = {
  id: string;
  procedureName: string;
  date: Date;
  place: string | undefined;
  duration: string | undefined;
  price: number | undefined;
  beforeAfter: string[];
  beforeImagePaths: string[];
  afterImagePaths: string[];
  notes: string | undefined;
  createdAt: string;
  updatedAt: string;
};

const createEmptyProcedureCard = (): ProcedureCard => ({
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
  const draftCard = ref<ProcedureCard | null>(null);
  const lastTouchedCardId = ref<string | null>(null);

  const startCreateCard = () => {
    editingCardId.value = null;
    draftCard.value = createEmptyProcedureCard();
  };

  const startEditCard = (card: ProcedureCard) => {
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

  const duplicateCardDraft = (card: ProcedureCard) => {
    const duplicatedCard: ProcedureCard = {
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
