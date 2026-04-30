export type TagDto = {
  id: string;
  userId: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Tag = {
  id: string;
  userId: string | null;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTagPayload = {
  name: string;
};

export type ProcedureTagsModel = {
  tagValues: string[];
};
