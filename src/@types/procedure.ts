export type Procedure = {
  id: string;
  procedureName: string;
  date: Date;
  place?: string;
  duration?: string;
  price?: number;
  beforeAfter: string[];
  beforeImagePaths: string[];
  afterImagePaths: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProcedureDto = {
  id: string;
  procedureName: string;
  date: string;
  place?: string;
  duration?: string;
  price?: number;
  beforeAfter: string[];
  beforeImagePaths: string[];
  afterImagePaths: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProcedurePayload = Omit<
  Procedure,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateProcedurePayload = Partial<
  Omit<Procedure, 'createdAt' | 'updatedAt'>
> & {
  id: string;
};

export type ProcedureDraft = Procedure;
