import $axios from '@/utils/axios';
import { LoginData, LoginRes } from './types';
enum URL {
  login = '/user/login',
  logout = '/user/logout',
  userAdd = '/user/add',
  userProfile = '/user/show',
  userUpdate='/user/update',
  order = '/comment/select',
  todayShow = '/dcc/show',
  batchUpdate = '/comment/batchUpdate',
  exportOrderInfo = '/comment/download',
  queryRedPacket = '/redpacket/select',
  moneyRecharge = '/comment/recharge',
  moneyUpdate = '/comment/updateM',
}
const api = {
  login: (data: LoginData) => {
    return $axios.post<LoginRes>(URL.login, data);
  },
  getTodayShow: () => {
    return $axios.get<any>(URL.todayShow);
  },
  getUserProfile: () => {
    return $axios.post<any>(URL.userProfile);
  },
  addUser: (data: any) => {
    return $axios.post<any>(URL.userAdd, data);
  },
  getOrder: (data: any) => {
    return $axios.post<any>(URL.order, data);
  },
  batchUpdate: (data: any) => {
    return $axios.post<any>(URL.batchUpdate, data);
  },
  exportOrderInfo: (data: any) => {
    return $axios.post<any>(URL.exportOrderInfo, data);
  },
  queryRedPacket: (data: any) => {
    return $axios.post<any>(URL.queryRedPacket, data);
  },
  moneyRecharge: (money: number) => {
    return $axios.get<any>(URL.moneyRecharge + '?money=' + money);
  },
  updateMoney: (data: any) => {
    return $axios.post<any>(URL.moneyUpdate, data);
  },
  updateUser: (data: any) => {
    return $axios.post<any>(URL.userUpdate, data);
  },
};
export default api;
