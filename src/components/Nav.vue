<template>
  <div :class="['main-nav', obj.show ? 'in' : ' ']">
    <div class="menu">
      <ul>
        <li v-for="(item, index) in obj.menu" key="index"
          :class="[currentIndex == index ? 'active' : item.active ? 'has-menu' : '']" @click="toNavigator(item)">
          <div class="list">
            <span class="icon">
              <svg-icon :iconName="item.iconName" color="#fff" size="18"></svg-icon>
            </span>
            <div class="text" v-show="!obj.show">{{ item.name }}</div>
            <span :class="['arrow', item.active ? 'arrow-rotate' : ' ']" v-if="item.children?.length && !obj.show">
              <el-icon>
                <ArrowUp />
              </el-icon>
            </span>
          </div>
          <ol>
            <li v-for="(ele, i) in item.children" :key="i">
              <router-link :to="ele.path" @click.stop.native @click="handleClickSub()">
                <span class="icon">
                  <svg-icon :iconName="ele.iconName" color="#fff" size="18"></svg-icon>
                </span>
                <div class="text" v-show="!obj.show">{{ ele.name }}</div>
              </router-link>
            </li>
          </ol>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { busEventEnum, emitter } from '@/utils/bus';
import { ArrowUp } from '@element-plus/icons-vue';
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { menuList, menuType, navType } from '../constant/index';
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
  if (!menu?.children?.length) {
    router.push(menu.path);
    var normalMenu = menuList.find((item) => item.children?.length);
    if (normalMenu) {
      normalMenu.active = false;
    }
  } else {
    menu.active = !menu.active;
  }
};
const handleClickSub = () => {
  currentIndex.value = -1;
};
const currentIndex = ref<number>(0);
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    //要执行的方法
    if (toPath !== '/index' && !toPath.startsWith('/system')) {
      const menu: Array<menuType> = menuList.filter((e) => e.path === toPath);
      if (!menu.length) {
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
  width: 100%;
  height: 100%;

  .menu {
    height: 100%;
    position: relative;
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

      >li {
        &:hover {
          background-color: #1f2529;
        }

        &.has-menu {
          ol {
            max-height: 42px;
          }
        }

        &.active {
          color: #fff;
          font-weight: bold;
          background-color: #18bc9c;

          svg {
            color: #fff;
          }
        }

        cursor: pointer;
        color: rgb(184, 199, 206);
        font-size: 14px;
        text-align: center;
        width: 100%;

        .list {
          display: flex;
          align-items: center;
          position: relative;

          .icon {
            display: inline-block;
            width: 50px;
            height: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .text {
            display: flex;
            line-height: 42px;
            height: 42px;

          }

          .arrow {
            position: absolute;
            right: 15px;
            top: 12px;
            transition: all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
            display: flex;
            justify-content: center;
            align-items: center;

            &.arrow-rotate {
              transform: rotate(180deg);
            }
          }
        }

        ol {
          list-style: none;
          padding: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          max-height: 0;


          li {


            a {
              background: #181f23;
              display: flex;
              text-decoration: none;
              color: #6c8c9b;
              align-items: center;

              .icon {
                display: inline-block;
                width: 50px;
                display: flex;
                height: 42px;
                justify-content: center;
                align-items: center;
              }

              .text {
                display: flex;
                line-height: 42px;
                height: 42px;
                opacity: 1;
                transition: all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
              }

              &.router-link-active {
                color: #fff;
                font-weight: bold;
                background-color: #18bc9c;
              }
            }
          }
        }
      }
    }
  }

  &.in {
    width: 50px;
    overflow: hidden;
  }
}
</style>
