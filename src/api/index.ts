import $axios from '@/utils/axios';
import { LoginData, LoginRes } from './types';

export function login(data: LoginData) {
  return $axios.post<LoginRes>('/user/login', data);
}
