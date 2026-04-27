import type { ProcedureDraft } from '@/@types';

import { uploadFile } from '@/api/uploads.ts';

import { useSaveProcedureMutation } from '@/composables/mutations/procedures/useSaveProcedureMutation.ts';

import type { ImageFiles } from './@types';

type UploadImagesArgs = {
  procedureId: string;
  files: ImageFiles;
};

const getSingleFile = (value: File | File[] | null): File | null => {
  if (!value) {
    return null;
  }

  return Array.isArray(value) ? (value[0] ?? null) : value;
};

export const uploadImages = async ({
  procedureId,
  files,
}: UploadImagesArgs): Promise<void> => {
  const beforeFile = getSingleFile(files.before);
  const afterFile = getSingleFile(files.after);

  if (beforeFile) {
    await uploadFile({
      file: beforeFile,
      procedureId,
      type: 'before',
    });
  }

  if (afterFile) {
    await uploadFile({
      file: afterFile,
      procedureId,
      type: 'after',
    });
  }
};

type SaveProcedureMutation = ReturnType<typeof useSaveProcedureMutation>;

type ProcedureCardsStore = {
  draftCard: ProcedureDraft | null;
  editingCardId: string | null;
  setLastTouchedCardId: (id: string) => void;
  clearDraft: () => void;
};

type SaveButtonClickHandlerArgs = {
  store: ProcedureCardsStore;
  saveProcedureMutation: SaveProcedureMutation;
  invalidateCacheCallback: () => Promise<void>;
  files: ImageFiles;
};

export const saveButtonClickHandler = async ({
  store,
  saveProcedureMutation,
  invalidateCacheCallback,
  files,
}: SaveButtonClickHandlerArgs): Promise<void> => {
  if (!store.draftCard) {
    return;
  }

  const draft = store.draftCard;

  if (store.editingCardId) {
    const saved = await saveProcedureMutation.mutateAsync({
      ...draft,
      id: store.editingCardId,
    });

    await uploadImages({
      procedureId: store.editingCardId,
      files,
    });

    await invalidateCacheCallback();

    store.setLastTouchedCardId(saved.id);
  } else {
    const payload = {
      procedureName: draft.procedureName,
      date: draft.date,
      place: draft.place,
      durationHours: draft.durationHours,
      durationMinutes: draft.durationMinutes,
      price: draft.price,
      beforeAfter: draft.beforeAfter,
      beforeImagePaths: [],
      afterImagePaths: [],
      notes: draft.notes,
      updatedAt: new Date().toISOString(),
    };

    const saved = await saveProcedureMutation.mutateAsync(payload);

    store.setLastTouchedCardId(saved.id);

    await uploadImages({
      procedureId: saved.id,
      files,
    });
  }

  await invalidateCacheCallback();

  store.clearDraft();
};
