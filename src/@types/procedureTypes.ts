export type ProcedureTypeDto = {
  id: string;
  userId: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ProcedureType = {
  id: string;
  userId: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProcedureTypePayload = {
  name: string;
};

export type ProcedureTypeModel = {
  typeValue: string | null;
  customTypeValue: string;
};
