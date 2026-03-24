import type { ProcedureCardHeaderProps } from '@/components';

export type ProcedureCardProps = ProcedureCardHeaderProps & {
  cardId: string;
  beforeAfter?: boolean;
  notes?: string;
}
