import type { MenuItem } from 'primevue/menuitem';

export type CardHeaderProps = {
  leftTop?: string;
  leftBottom?: string;
  rightTop?: string;
  rightBottom?: string;
  menuItems: MenuItem[];
};
