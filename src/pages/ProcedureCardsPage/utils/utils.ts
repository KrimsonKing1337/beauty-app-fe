import type { ProcedurePlace } from '@/@types';

export const getProcedurePlaceNameById = (places: ProcedurePlace[] | undefined, id: string | null)=> {
  if (!places || !id) {
    return '';
  }

  const place = places.find((placeCur) => {
    return placeCur.id === id;
  });

  return place?.name ?? '';
};
