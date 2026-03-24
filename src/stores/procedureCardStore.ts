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

export const useProcedureCardStore = defineStore('procedureCard', () => {
  const cards = ref<ProcedureCard[]>(defaultCards);
  const editingCardId = ref<string | null>(null);

  const editingCard = computed(() => {
    if (!editingCardId.value) {
      return null;
    }

    return cards.value.find((card) => card.id === editingCardId.value) ?? null;
  });

  const addCard = (payload?: Partial<Omit<ProcedureCard, 'id'>>) => {
    const newCard: ProcedureCard = {
      ...createEmptyProcedureCard(),
      ...payload,
    }

    cards.value.push(newCard);

    return newCard;
  };

  const updateCard = (id: string, payload: Partial<Omit<ProcedureCard, 'id'>>) => {
    const card = cards.value.find((item) => item.id === id);

    if (!card) {
      return
    }

    Object.assign(card, payload);
  };

  const removeCard = (id: string) => {
    cards.value = cards.value.filter((card) => card.id !== id);

    if (editingCardId.value === id) {
      editingCardId.value = null;
    }
  }

  const setEditingCardId = (id: string | null) => {
    editingCardId.value = id;
  }

  return {
    cards,
    editingCardId,
    editingCard,
    addCard,
    updateCard,
    removeCard,
    setEditingCardId,
  }
});
