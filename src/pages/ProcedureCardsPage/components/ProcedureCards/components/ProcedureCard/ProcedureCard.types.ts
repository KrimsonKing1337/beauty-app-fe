import type { HeaderProps } from './components/Header/Header.types.ts';

export type ProcedureCardProps = HeaderProps & {
  cardId: string;
  beforeAfter?: boolean;
  notes: string | null;
}
