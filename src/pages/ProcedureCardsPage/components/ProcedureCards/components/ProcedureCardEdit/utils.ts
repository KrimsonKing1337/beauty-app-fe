import type {
  CreateProcedurePayload,
  CreateReminderPayload,
  ProcedureDraft,
  ProcedureImage,
  Reminder,
  ReminderNotifications,
  ReminderRepeat,
  UpdateProcedurePayload,
  UpdateReminderPayload,
} from '@/@types';

import { uploadImages as uploadProcedureImages } from '@/api/uploads.ts';

import { useSaveProcedureMutation } from '@/composables/mutations/procedures/useSaveProcedureMutation.ts';
import { useCreateReminderMutation } from '@/composables/mutations/reminders/useCreateReminderMutation.ts';
import { useUpdateReminderMutation } from '@/composables/mutations/reminders/useUpdateReminderMutation.ts';
import { useDeleteReminderMutation } from '@/composables/mutations/reminders/useDeleteReminderMutation.ts';

import { trimSeconds } from '@/utils';

import type { PendingProcedureImageFile } from './@types';

type UploadNewImagesArgs = {
  procedureId: string;
  pendingImages: PendingProcedureImageFile[];
  existingImages: ProcedureImage[];
};

const PROCEDURE_REMINDER_REPEAT: ReminderRepeat = {
  preset: 'none',
  interval: 1,
  unit: 'day',
  daysOfWeek: [],
};

const getExistingProcedureImages = (
  procedure: ProcedureDraft,
): ProcedureImage[] => {
  return procedure.images
    .filter((image): image is ProcedureImage => Boolean(image.id))
    .map((image) => ({
      id: image.id,
      path: image.path,
      label: image.label,
    }));
};

const buildCreateProcedurePayload = (
  draft: ProcedureDraft,
): CreateProcedurePayload => ({
  procedureName: draft.procedureName,
  dateTime: trimSeconds(draft.dateTime),
  placeId: draft.placeId,
  durationHours: draft.durationHours,
  durationMinutes: draft.durationMinutes,
  price: draft.price,
  images: [],
  notes: draft.notes,
  typeId: draft.typeId,
  tagIds: draft.tagIds,
});

const buildUpdateProcedurePayload = (
  draft: ProcedureDraft,
  id: string,
): UpdateProcedurePayload => ({
  id,
  procedureName: draft.procedureName,
  dateTime: trimSeconds(draft.dateTime),
  placeId: draft.placeId,
  durationHours: draft.durationHours,
  durationMinutes: draft.durationMinutes,
  price: draft.price,
  images: getExistingProcedureImages(draft),
  notes: draft.notes,
  typeId: draft.typeId,
  tagIds: draft.tagIds,
});

export const uploadNewImages = async ({
  procedureId,
  pendingImages,
  existingImages,
}: UploadNewImagesArgs): Promise<ProcedureImage[]> => {
  if (!pendingImages.length) {
    return [];
  }

  const existingImageIds = new Set(existingImages.map((image) => image.id));

  const procedureImagesAfterUpload = await uploadProcedureImages({
    procedureId,
    files: pendingImages.map((image) => image.file),
    labels: pendingImages.map((image) => image.label),
  });

  return procedureImagesAfterUpload.filter((image) => {
    return !existingImageIds.has(image.id);
  });
};

type SaveProcedureMutation = ReturnType<typeof useSaveProcedureMutation>;
type CreateReminderMutation = ReturnType<typeof useCreateReminderMutation>;
type UpdateReminderMutation = ReturnType<typeof useUpdateReminderMutation>;
type DeleteReminderMutation = ReturnType<typeof useDeleteReminderMutation>;

type ProcedureCardsStore = {
  draftCard: ProcedureDraft | null;
  editingCardId: string | null;
  setLastTouchedCardId: (id: string | null) => void;
  clearDraft: () => void;
};

type BuildProcedureReminderPayloadArgs = {
  procedure: ProcedureDraft;
  procedureId: string;
  notifications: ReminderNotifications;
  placeName: string;
};

const buildProcedureReminderPayload = ({
  procedure,
  procedureId,
  notifications,
  placeName,
}: BuildProcedureReminderPayloadArgs): CreateReminderPayload => {
  const placeText = placeName ? `Место: ${placeName}` : '';

  return {
    name: procedure.procedureName || 'Процедура',
    description: placeText,
    dateTime: trimSeconds(procedure.dateTime),
    repeat: PROCEDURE_REMINDER_REPEAT,
    notifications,
    procedureId,
    isCompleted: false,
  };
};

type SyncProcedureReminderArgs = {
  procedure: ProcedureDraft;
  procedureId: string;
  notifications: ReminderNotifications;
  existingReminder: Reminder | null;
  createReminderMutation: CreateReminderMutation;
  updateReminderMutation: UpdateReminderMutation;
  placeName: string;
};

const syncProcedureReminder = async ({
  procedure,
  procedureId,
  notifications,
  existingReminder,
  createReminderMutation,
  updateReminderMutation,
  placeName,
}: SyncProcedureReminderArgs): Promise<void> => {
  const payload = buildProcedureReminderPayload({
    procedure,
    procedureId,
    notifications,
    placeName,
  });

  if (existingReminder) {
    const updatePayload: UpdateReminderPayload = payload;

    await updateReminderMutation.mutateAsync({
      id: existingReminder.id,
      payload: updatePayload,
    });

    return;
  }

  await createReminderMutation.mutateAsync(payload);
};

type SaveButtonClickHandlerArgs = {
  store: ProcedureCardsStore;
  saveProcedureMutation: SaveProcedureMutation;
  createReminderMutation: CreateReminderMutation;
  updateReminderMutation: UpdateReminderMutation;
  deleteReminderMutation: DeleteReminderMutation;
  pendingImages: PendingProcedureImageFile[];
  shouldRemind: boolean;
  remindForValues: ReminderNotifications;
  existingProcedureReminder: Reminder | null;
  placeName: string;
};

export const saveButtonClickHandler = async ({
  store,
  saveProcedureMutation,
  createReminderMutation,
  updateReminderMutation,
  deleteReminderMutation,
  pendingImages,
  shouldRemind,
  remindForValues,
  existingProcedureReminder,
  placeName,
}: SaveButtonClickHandlerArgs): Promise<void> => {
  if (!store.draftCard) {
    return;
  }

  const draft = store.draftCard;

  if (store.editingCardId) {
    const savedWithoutNewImages = await saveProcedureMutation.mutateAsync(
      buildUpdateProcedurePayload(draft, store.editingCardId),
    );

    const uploadedImages = await uploadNewImages({
      procedureId: savedWithoutNewImages.id,
      pendingImages,
      existingImages: savedWithoutNewImages.images,
    });

    const saved = uploadedImages.length
      ? await saveProcedureMutation.mutateAsync({
        ...buildUpdateProcedurePayload(draft, savedWithoutNewImages.id),
        images: [
          ...savedWithoutNewImages.images,
          ...uploadedImages,
        ],
      })
      : savedWithoutNewImages;

    if (shouldRemind) {
      await syncProcedureReminder({
        procedure: draft,
        procedureId: saved.id,
        notifications: remindForValues,
        existingReminder: existingProcedureReminder,
        createReminderMutation,
        updateReminderMutation,
        placeName,
      });
    } else if (existingProcedureReminder) {
      await deleteReminderMutation.mutateAsync(existingProcedureReminder.id);
    }

    store.setLastTouchedCardId(saved.id);
  } else {
    const savedWithoutImages = await saveProcedureMutation.mutateAsync(
      buildCreateProcedurePayload(draft),
    );

    const uploadedImages = await uploadNewImages({
      procedureId: savedWithoutImages.id,
      pendingImages,
      existingImages: savedWithoutImages.images,
    });

    const saved = uploadedImages.length
      ? await saveProcedureMutation.mutateAsync({
        id: savedWithoutImages.id,
        dateTime: trimSeconds(savedWithoutImages.dateTime),
        images: uploadedImages,
      })
      : savedWithoutImages;

    if (shouldRemind) {
      await syncProcedureReminder({
        procedure: draft,
        procedureId: saved.id,
        notifications: remindForValues,
        existingReminder: null,
        createReminderMutation,
        updateReminderMutation,
        placeName,
      });
    }

    store.setLastTouchedCardId(saved.id);
  }

  store.clearDraft();
};
