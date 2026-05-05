import type {
  CreateReminderPayload,
  ProcedureDraft,
  Reminder,
  ReminderNotifications,
  ReminderRepeat,
  UpdateReminderPayload,
} from '@/@types';

import { uploadFile } from '@/api/uploads.ts';

import { useSaveProcedureMutation } from '@/composables/mutations/procedures/useSaveProcedureMutation.ts';
import { useCreateReminderMutation } from '@/composables/mutations/reminders/useCreateReminderMutation.ts';
import { useUpdateReminderMutation } from '@/composables/mutations/reminders/useUpdateReminderMutation.ts';

import { trimSeconds } from '@/utils';

import type { ImageFiles } from './@types';

type UploadImagesArgs = {
  procedureId: string;
  files: ImageFiles;
};

const PROCEDURE_REMINDER_REPEAT: ReminderRepeat = {
  preset: 'none',
  interval: 1,
  unit: 'day',
  daysOfWeek: [],
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
type CreateReminderMutation = ReturnType<typeof useCreateReminderMutation>;
type UpdateReminderMutation = ReturnType<typeof useUpdateReminderMutation>;

type ProcedureCardsStore = {
  draftCard: ProcedureDraft | null;
  editingCardId: string | null;
  setLastTouchedCardId: (id: string) => void;
  clearDraft: () => void;
};

type BuildProcedureReminderPayloadArgs = {
  procedure: ProcedureDraft;
  procedureId: string;
  notifications: ReminderNotifications;
};

const buildProcedureReminderPayload = ({
  procedure,
  procedureId,
  notifications,
}: BuildProcedureReminderPayloadArgs): CreateReminderPayload => {
  const placeText = procedure.place ? `Место: ${procedure.place}` : '';

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
};

const syncProcedureReminder = async ({
  procedure,
  procedureId,
  notifications,
  existingReminder,
  createReminderMutation,
  updateReminderMutation,
}: SyncProcedureReminderArgs): Promise<void> => {
  const payload = buildProcedureReminderPayload({
    procedure,
    procedureId,
    notifications,
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
  invalidateCacheCallback: () => Promise<void>;
  files: ImageFiles;
  remindForValues: ReminderNotifications;
  existingProcedureReminder: Reminder | null;
};

export const saveButtonClickHandler = async ({
  store,
  saveProcedureMutation,
  createReminderMutation,
  updateReminderMutation,
  invalidateCacheCallback,
  files,
  remindForValues,
  existingProcedureReminder,
}: SaveButtonClickHandlerArgs): Promise<void> => {
  if (!store.draftCard) {
    return;
  }

  const draft = store.draftCard;

  if (store.editingCardId) {
    const saved = await saveProcedureMutation.mutateAsync({
      ...draft,
      id: store.editingCardId,
      dateTime: trimSeconds(draft.dateTime),
    });

    await syncProcedureReminder({
      procedure: draft,
      procedureId: saved.id,
      notifications: remindForValues,
      existingReminder: existingProcedureReminder,
      createReminderMutation,
      updateReminderMutation,
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
      dateTime: trimSeconds(draft.dateTime),
      place: draft.place,
      durationHours: draft.durationHours,
      durationMinutes: draft.durationMinutes,
      price: draft.price,
      beforeImagePaths: [],
      afterImagePaths: [],
      notes: draft.notes,
      typeId: draft.typeId,
      tagIds: draft.tagIds,
      updatedAt: new Date().toISOString(),
    };

    const saved = await saveProcedureMutation.mutateAsync(payload);

    await syncProcedureReminder({
      procedure: {
        ...draft,
        id: saved.id,
      },
      procedureId: saved.id,
      notifications: remindForValues,
      existingReminder: null,
      createReminderMutation,
      updateReminderMutation,
    });

    store.setLastTouchedCardId(saved.id);

    await uploadImages({
      procedureId: saved.id,
      files,
    });
  }

  await invalidateCacheCallback();

  store.clearDraft();
};
