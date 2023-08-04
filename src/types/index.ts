export interface IResponseData<T> {
  //服务器接口返回类型
  code: number;
  msg: string;
  data: T;
}

 
