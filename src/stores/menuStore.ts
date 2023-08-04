import { menuList, menuType } from '@/constant';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { userInfoStore } from './userInfo';

type MenuListType = {
  tabMenu: menuType[];
  menu: menuType[];
};

export const useMenuStore = defineStore('menuStore', () => {
  const state = reactive<MenuListType>({
    tabMenu: [], //当前顶部选中菜单
    menu: menuList,
  });
  const updateUseTabMenuList = (menu: menuType, type: number = 0) => {
    if (type === 0) {
      if (state.tabMenu.indexOf(menu) == -1) {
        state.tabMenu.push(menu);
      }
    } else {
      let index = state.tabMenu.indexOf(menu);
      if (index > -1 && state.tabMenu.length > 1) {
        state.tabMenu.splice(index, 1);
      }
    }
    state.tabMenu.sort((a: menuType, b: menuType) => a.index - b.index);
  };
  const userInfo = userInfoStore();
  const updateMenu = (): void => {
    let currentMenu: menuType | undefined = state.menu.find((item) => item.children?.length);
    if (userInfo.role == 1) {
      if (currentMenu) {
        if (!currentMenu.children.some((ele: menuType) => ele.path == '/user-manage')) {
          currentMenu.children.push({
            name: '用户管理',
            path: '/user-manage',
            iconName: 'icon-kaifazheguanli',
            index: currentMenu.index,
          });
        }
      }
    } else {
      if (currentMenu) {
        const t: number = currentMenu.children.findIndex((ele: menuType) => ele.path === '/user-manage');
        if (t > -1) {
          currentMenu.children.splice(t, 1);
        }
      }
    }
  };

  return { tabMenu: state.tabMenu, menu: state.menu, updateUseTabMenuList, updateMenu };
});
