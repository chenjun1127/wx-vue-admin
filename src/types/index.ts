export interface IResponseData<T> {
  //服务器接口返回类型
  errcode: boolean;
  errmsg: string;
  data: T;
}

export interface IArea {
  code: number | string;
  deleteFlag?: number;
  head?: string;
  id?: number | string;
  level: number;
  name: string;
  parentId?: number | string;
  region?: any;
  servicestate?: any;
  type?: any;
}
export interface ICodeParams {
  provence_code: string;
  city_code?: string;
  town_code?: string;
  street_code?: string;
  area_code?: string;
  timestamp: number;
  sign?: string;
}
