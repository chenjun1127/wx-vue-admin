import { menuType } from '@/constant';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

type MenuListType = {
  list: menuType[];
};

export const useMenuStore = defineStore('menuStore', () => {
  const currentMenu = reactive<MenuListType>({
    list: [], //当前菜单
  });
  const updateUseMenuList = (menu: menuType, type: number = 0) => {
    if (type === 0) {
      if (currentMenu.list.indexOf(menu) == -1) {
        currentMenu.list.push(menu);
      }
    } else {
      let index = currentMenu.list.indexOf(menu);
      if (index > -1 && currentMenu.list.length > 1) {
        currentMenu.list.splice(index, 1);
      }
    }
    currentMenu.list.sort((a: menuType, b: menuType) => a.index - b.index);
  };
  return { currentMenu: currentMenu, updateUseMenuList };
});
