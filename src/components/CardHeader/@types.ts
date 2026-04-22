export type MenuItem = {
  id: string;
  label: string;
  icon: string;
  action: () => void;
};

export type CardHeaderProps = {
  leftTop?: string;
  leftBottom?: string;
  rightTop?: string;
  rightBottom?: string;
  menuItems: MenuItem[];
};
