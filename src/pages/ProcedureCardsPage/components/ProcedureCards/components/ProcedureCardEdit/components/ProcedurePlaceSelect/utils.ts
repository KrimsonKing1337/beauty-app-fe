import type { ProcedurePlace } from '@/@types';

export const getProcedurePlacesOptions = (procedurePlaces: ProcedurePlace[]) => {
  return procedurePlaces.map((procedurePlaceCur) => {
    return {
      title: procedurePlaceCur.name,
      value: procedurePlaceCur.id,
      id: procedurePlaceCur.id,
      isCustom: !!procedurePlaceCur.userId,
    };
  });
};
