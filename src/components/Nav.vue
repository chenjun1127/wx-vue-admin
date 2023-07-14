<template>
  <div :class="['main-nav', obj.show ? 'in' : ' ']">
    <div class="menu">
      <ul>
        <li v-for="(item, index) in obj.menu" key="index" :class="[currentIndex == index ? 'active' : '']" @click="toNavigator(item)">
          <span> <svg-icon :iconName="item.iconName" color="#4abce5"></svg-icon></span>
          <div class="text">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { menuList, menuType, navType } from '@/constant';
import { busEventEnum, emitter } from '@/utils/bus';
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const obj = reactive<navType>({
  menu: menuList,
  show: false,
});

onMounted(() => {
  emitter.on(busEventEnum.menuShow, (res: any) => {
    obj.show = res;
  });
});
onBeforeMount(() => {
  emitter.off(busEventEnum.menuShow);
});
const toNavigator = (menu: menuType) => {
  if (!menu.invalid) {
    router.push(menu.path);
  } else {
    router.push('/');
  }
};
const currentIndex = ref<number>(0);
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    //要执行的方法
    if (toPath !== '/index' && !toPath.startsWith('/system')) {
      const menu: Array<menuType> = menuList.filter((e) => e.path === toPath);
      if (!menu.length) {
        let text: string = '';
        if (toPath.startsWith('/community')) {
          text = '小区数据';
        } else if (toPath.startsWith('/car')) {
          text = '车辆数据';
        } else if (toPath.startsWith('/special')) {
          text = '特殊群体';
        } else if (toPath.startsWith('/warn')) {
          text = '告警中心';
        }
        currentIndex.value = menuList.findIndex((e: menuType) => e.name == text);
      } else {
        currentIndex.value = menuList.indexOf(menu[0]);
      }
    } else {
      currentIndex.value = 0;
    }
  },
  { immediate: true, deep: true }
);
</script>
<style scoped lang="scss">
.main-nav {
  user-select: none;
  position: relative;
  transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  width: 0;
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 1px;
    background: linear-gradient(180deg, rgba(74, 188, 229, 0.1) 0%, #6accf0 51%, rgba(74, 188, 229, 0.1) 100%);
  }

  .menu {
    height: 100%;
    position: relative;
    background-color: rgba(1, 3, 15, 0.5);
    background-size: 100% 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;

    ul {
      position: relative;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-top: 30px;
      padding-left: 0;
      list-style: none;

      li {
        &.active {
          background-color:rgba($color: #4abce5, $alpha: 0.5);
          font-weight: bold;
          svg {
            color: #fff;
          } 
        }

        cursor: pointer;
        color: #4abce5;
        font-size: 14px;
        align-items: center;
        text-align: center;
        display: flex;
        span {
          display: inline-block;
          width: 50px;
        }
        .text {
          display: flex;
          width: 0;
          line-height: 48px;
          opacity: 0;
          height: 48px;
          transition: all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
        }

        &:hover {
          @extend .active;
        }
      }
    }
  }
  &.in {
    width: 150px;
    ul {
      li {
        .text {
          opacity: 1;
          width: 100px;
        }
      }
    }
  }
}
</style>
