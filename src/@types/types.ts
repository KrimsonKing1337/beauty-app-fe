type Product = {
  id: string;
  name: string;
  price: number;
}

type Procedure = {
  id: string;
  title: string;
  category: 'face' | 'body' | 'hair' | 'nails' | 'other';
  date: string;
  duration?: number;

  price?: number;
  location?: 'home' | 'salon' | 'other';
  master?: string;

  notes?: string;

  images?: {
    before?: string[];
    after?: string[];
  }

  products?: Product[];

  rating?: number;
  feeling?: 'bad' | 'neutral' | 'good' | 'excellent';

  repeat?: {
    intervalDays: number;
    nextDate?: string;
  }
}
