import { UserInfo } from '@/types/type';
import { defineStore } from 'pinia';

export const userInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      name: '华莱士-观澜松元厦店',
      password: '',
      phone: '',
      online: 1,
      role: 0,
      petName: '',
    } as UserInfo;
  },
  getters: {
    getName(state): string {
      return state.name;
    },   
  },
  // 修改方法
  actions: {
    setName(name: string) {
      this.name = name;
    },
    updateUserInfo(obj: UserInfo) {
      this.name = obj.name;
      this.role = obj.role;
      this.phone = obj.phone;
      this.online = obj.online;
      this.petName = obj.petName;
      this.type = obj.type;
    },
  },
});
