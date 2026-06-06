export type ProcedurePlaceDto = {
  id: string;
  userId: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ProcedurePlace = {
  id: string;
  userId: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProcedurePlacePayload = {
  name: string;
};

export type ProcedurePlaceModel = {
  placeValue: string | null;
};
