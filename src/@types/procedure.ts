import type { Reminder } from '@/@types/reminder.ts';

export type ProcedureImage = {
  id: string;
  path: string;
  label: string;
};

export type ProcedureDraftImage = {
  id: string;
  path: string;
  label: string;
};

export type Procedure = {
  id: string;
  procedureName: string;
  dateTime: Date;
  placeId: string | null;
  durationHours?: number;
  durationMinutes?: number;
  price?: number;
  images: ProcedureImage[];
  reminder: Reminder | null;
  notes?: string;
  typeId?: string | null;
  tagIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProcedureDto = {
  id: string;
  procedureName: string;
  dateTime: string;
  placeId: string | null;
  durationHours?: number;
  durationMinutes?: number;
  price?: number;
  images?: ProcedureImage[];
  reminder: Reminder | null;
  notes?: string;
  typeId?: string | null;
  tagIds?: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProcedureSortBy =
  | 'dateTime'
  | 'createdAt'
  | 'updatedAt'
  | 'procedureName'
  | 'price'
  | 'duration';

export type SortOrder = 'asc' | 'desc';

export type ProceduresQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: ProcedureSortBy;
  sortOrder?: SortOrder;
  search?: string;
  typeId?: string | null;
  tagIds?: string[];
  dateFrom?: string;
  dateTo?: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  pagination: Pagination;
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

export type ProcedureDraft = Omit<Procedure, 'id' | 'images'> & {
  images: ProcedureDraftImage[];
};
