import { UserInfo } from "@/types/type";

export interface LoginData {
  name: string;
  password: string;
}
/* 登录接口返回值类型 */
export interface LoginRes extends UserInfo {
  token?: string;
}
/* 用户信息接口返回值类型 */
export interface UserInfoRes {
  id: string;
  username: string;
  avatar: string;
  description: string;
}
