import { defineStore } from 'pinia';

export const userInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      name: '',
      password: '',
      phone: '',
    };
  },
  getters: {
    getName(state): string {
      return state.name;
    },
    getPassword(state): string {
      return state.password;
    },
    getPhone(state): string {
      return state.phone;
    },
  },
  // 修改方法
  actions: {
    setName(name: string) {
      this.name = name;
    },
    setPassword(p: string) {
      this.password = p;
    },
    setPhone(p: string) {
      this.phone = p;
    },
  },
});
