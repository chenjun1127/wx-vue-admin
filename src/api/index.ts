import $axios from '@/utils/axios';
import { LoginData, LoginRes } from './types';
enum URL {
  login = '/user/login',
  logout = '/user/logout',
  userAdd = '/user/add',
  userProfile = '/user/show',
  order = '/comment/select',
  todayShow = '/dcc/show',
  batchUpdate = '/comment/batchUpdate',
  exportOrderInfo = '/comment/download',
  queryRedPacket='/redpacket/select'
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
};
export default api;
