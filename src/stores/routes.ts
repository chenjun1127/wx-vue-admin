import { defineStore } from 'pinia';

export const studyStore = defineStore('routesStore', {
  state: () => {
    return {
      num: 1 as number
    };
  },
  //类似于computed 可以帮我们去修饰我们的值
  getters: {},
  //可以操作异步 和 同步提交state
  actions: {}
});
