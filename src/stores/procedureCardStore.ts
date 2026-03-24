import { ref } from 'vue'
import { defineStore } from 'pinia'

type ProcedureCard = {
  name: string;
  date: Date;
  place: string;
  duration: string;
  price: number | null;
  beforeAfter: string[];
  notes: string;
}

const getDefaultCard = (): ProcedureCard => ({
  name: 'Маникюр',
  date: new Date(),
  place: 'Салон',
  duration: '90 мин',
  price: 1500,
  beforeAfter: [],
  notes: 'Обновили покрытие, использовали новый оттенок',
});

export const useProcedureCardStore = defineStore('procedureCard', () => {
  const card = ref<ProcedureCard>(getDefaultCard());

  return {
    card,
  }
});
