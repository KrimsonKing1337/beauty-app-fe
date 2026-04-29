import type { ProcedureType } from '@/@types';

export const getProcedureTypesOptions = (procedureTypes: ProcedureType[]) => {
  const procedureTypesMapped = procedureTypes.map((procedureTypeCur) => {
    return {
      title: procedureTypeCur.name,
      value: procedureTypeCur.id,
      isCustom: !!procedureTypeCur.userId,
    };
  });

  return [
    ...procedureTypesMapped,
    {
      title: 'Добавить свой',
      value: 'custom',
      isCustom: false,
    },
  ];
};
