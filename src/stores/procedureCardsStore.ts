import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type ProcedureCard = {
  id: string;
  procedureName: string;
  date: Date | null;
  place: string;
  duration: string;
  price: number | null;
  beforeAfter: string[];
  notes: string;
}

const createEmptyProcedureCard = (): ProcedureCard => ({
  id: crypto.randomUUID(),
  procedureName: '',
  date: null,
  place: '',
  duration: '',
  price: 0,
  beforeAfter: [],
  notes: '',
});

const defaultCards = [
  {
    id: crypto.randomUUID(),
    procedureName: 'Маникюр',
    date: new Date(),
    place: 'Салон',
    duration: '90 мин',
    price: 1500,
    beforeAfter: [],
    notes: 'Обновили покрытие, использовали новый оттенок',
  },
  {
    id: crypto.randomUUID(),
    procedureName: 'Окрашивание волос',
    date: new Date(),
    place: 'Дом',
    duration: '100 мин',
    price: 0,
    beforeAfter: [],
    notes: '',
  },
  {
    id: crypto.randomUUID(),
    procedureName: 'Крем на лицо',
    date: new Date(),
    place: 'Дом',
    duration: '10 мин',
    price: 0,
    beforeAfter: [],
    notes: 'Пробуем новый крем из Кореи',
  },
];

export const useProcedureCardsStore = defineStore('procedureCard', () => {
  const cards = ref<ProcedureCard[]>(defaultCards);
  const editingCardId = ref<string | null>(null);
  const draftCard = ref<ProcedureCard | null>(null);
  const lastTouchedCardId = ref<string | null>(null);

  const addCard = (payload?: Partial<Omit<ProcedureCard, 'id'>>) => {
    const newCard: ProcedureCard = {
      ...createEmptyProcedureCard(),
      ...payload,
    }

    cards.value.push(newCard);

    lastTouchedCardId.value = newCard.id;

    return newCard;
  };

  const startCreateCard = () => {
    editingCardId.value = null;
    draftCard.value = createEmptyProcedureCard();
  }

  const startEditCard = (id: string) => {
    const card = cards.value.find((item) => item.id === id);

    if (!card) {
      return;
    }

    editingCardId.value = id;
    draftCard.value = { ...card };
  }

  const duplicateCard = (id: string) => {
    const index = cards.value.findIndex((card) => card.id === id);

    if (index === -1) {
      return;
    }

    const newId = crypto.randomUUID();

    const duplicatedCard = {
      ...cards.value[index],
      id: newId,
    } as ProcedureCard;

    cards.value.splice(index, 0, duplicatedCard);
    lastTouchedCardId.value = newId;

    startEditCard(newId);
  };

  const cancelEdit = () => {
    lastTouchedCardId.value = editingCardId.value;

    editingCardId.value = null;
    draftCard.value = null;
  }

  const saveDraft = () => {
    if (!draftCard.value) {
      return;
    }

    if (editingCardId.value) {
      const index = cards.value.findIndex((card) => card.id === editingCardId.value);

      if (index === -1) {
        return;
      }

      cards.value[index] = { ...draftCard.value };
    } else {
      cards.value.push({ ...draftCard.value });
    }

    lastTouchedCardId.value = draftCard.value.id;

    editingCardId.value = null;
    draftCard.value = null;
  }

  const removeCard = (id: string) => {
    const index = cards.value.findIndex((card) => card.id === id);

    if (index === -1) {
      return;
    }

    const prevId = cards.value[index - 1]?.id ?? null;
    const nextId = cards.value[index + 1]?.id ?? null;

    cards.value = cards.value.filter((card) => card.id !== id);

    if (editingCardId.value === id) {
      editingCardId.value = null;
      draftCard.value = null;
    }

    if (lastTouchedCardId.value === id) {
      lastTouchedCardId.value = nextId ?? prevId;
    }
  };

  return {
    cards,
    editingCardId,
    draftCard,
    lastTouchedCardId,
    addCard,
    startCreateCard,
    startEditCard,
    cancelEdit,
    saveDraft,
    removeCard,
    duplicateCard,
  }
});
