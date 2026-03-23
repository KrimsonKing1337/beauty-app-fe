type Chip = {
  id: string;
  label: string;
  isActive?: boolean;
};

export type ChipsProps = {
  chips: Chip[];
};
