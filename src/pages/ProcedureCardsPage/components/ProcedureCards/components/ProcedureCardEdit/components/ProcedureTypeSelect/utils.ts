import type { ProcedureType } from '@/@types';

export const getProcedureTypesOptions = (procedureTypes: ProcedureType[]) => {
  return procedureTypes.map((procedureTypeCur) => {
    return {
      title: procedureTypeCur.name,
      value: procedureTypeCur.id,
      isCustom: !!procedureTypeCur.userId,
    };
  });
};
