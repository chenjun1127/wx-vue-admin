<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <div class="toggle" @click="toggleMenu">
        <svg-icon iconName="icon-menu" color="#333"></svg-icon>
      </div>
      <ol class="top-menu-list">
        <li v-for="item in currentMenu.list" :key="item.path" @click="handleClickMenu(item)">
          <router-link :to="item.path">
            <span>{{ item?.name }}</span>
          </router-link>
          <em @click="handleClickDel(item)">&times;</em>
        </li>
      </ol>
    </div>
    <el-popover placement="bottom" :width="300" trigger="click">
      <template #reference>
        <div class="avatar-right">
          <div class="avatar-right-img">
            <img src="../assets/images/avatar.png" alt="" />
          </div>
          <div class="avatar-right-text">
            {{ userInfo.name }}
          </div>
        </div>
      </template>
      <div class="avatar-right-popover">
        <div class="avatar-right-popover-content">
          <img src="../assets/images/avatar.png" alt="" />
          <h1>{{ userInfo.name }}</h1>
          <h2>{{ dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') }}</h2>
        </div>
        <div class="avatar-right-popover-buttons">
          <el-button @click="toInfo" type="primary" :icon="Avatar">个人资料</el-button>
          <el-button @click="exit" type="danger" :icon="SwitchButton">退出</el-button>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
import { dayjs } from 'element-plus';
import { userInfoStore } from '../stores/userInfo';
import { SwitchButton, Avatar } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { busEventEnum, emitter } from '@/utils/bus';
import { useMenuStore } from '@/stores/menuStore';
const useMenu = useMenuStore();
const userInfo = userInfoStore();
const router = useRouter();
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { menuType } from '@/constant';
const { currentMenu } = storeToRefs(useMenu);
const show = ref<boolean>(false);
const toInfo = () => {
  router.push('/manage');
};
const exit = () => {
  router.replace('/login');
};
const toggleMenu = () => {
  show.value = !show.value;
  emitter.emit(busEventEnum.menuShow, show.value);
};
const handleClickDel = (menu: menuType) => {
  // router.push(menu.path);
  useMenu.updateUseMenuList(menu, 1);
};
</script>
<style lang="scss" scoped>
.top-bar {
  background-color: #fff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  &-left {
    display: flex;
    align-items: center;
  }
}
.toggle {
  cursor: pointer;
  margin-top: 1px;
}
.top-menu-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  margin-left: 15px;
  li {
    height: 50px;
    display: flex;
    margin-right: 10px;
    &:hover {
      background-color: #f2f2f2;
    }
    a {
      padding: 0 10px;
      cursor: pointer;
      color: #333;
      text-decoration: none;
      display: flex;
      align-items: center;
    }
    em {
      margin-left: 5px;
      display: flex;
      cursor: pointer;
      align-items: center;
    }
  }
}
.avatar-right {
  display: flex;
  align-items: center;
  cursor: pointer;
  &-img {
    width: 26px;
    height: 26px;
    border-radius: 100%;
    > img {
      width: 26px;
      height: 26px;
      border-radius: 100%;
      display: block;
    }
  }
  &-text {
    margin-left: 10px;
    font-size: 14px;
  }
}
.avatar-right-popover {
  &-content {
    background-color: #222d32;
    padding: 10px;
    display: flex;
    align-items: center;
    color: #fff;
    flex-direction: column;
    img {
      width: 80px;
      height: 80px;
      border-radius: 100%;
      display: block;
      margin-bottom: 10px;
    }
    h1 {
      font-size: 14px;
    }
    h2 {
      font-size: 12px;
    }
  }
  &-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0 0 0;
  }
}
</style>
