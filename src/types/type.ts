import type { IArea } from '.';

export type Model = Record<string, any>;
export type AreaData = {
  provinceList: any[];
  cityList: Model[];
  townList: Model[];
  streetList: Model[];
  villageList: Model[];
  selectProvince: Partial<IArea>;
  selectCity: Partial<IArea>;
  selectTown: Partial<IArea>;
  selectStreet: Partial<IArea>;
  selectVillage: Partial<IArea>;
  level: number;
};
export type DefaultForm = {
  name: string;
  phone: string | number;
  idCard: string;
  showProvince?: boolean;
  showCity?: boolean;
  showTown?: boolean;
  showStreet?: boolean;
  showVillage?: boolean;
};
