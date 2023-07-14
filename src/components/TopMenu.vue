<template>
  <header class="top-menu">
    <div class="left">
      <!-- <div class="icon-toggle" @click="toggleMenu">
        <el-icon color="#4abce5" :size="22">
          <template v-if="menuShow">
            <Fold />
          </template>
          <template v-else>
            <Expand />
          </template>
        </el-icon>
      </div> -->
      <p v-if="noIframe">数据汇聚平台</p>
    </div>
    <div class="right">
      <!-- <el-popover placement="left" :width="300" trigger="click" popper-class="el-popover-search">
        <template #reference>
          <el-icon color="#4abce5" :size="24">
            <Search />
          </el-icon>
        </template>
        <el-input v-model="input3" maxlength="18" placeholder="请输入人员姓名/手机号/证件号" class="input-with-select menu-input">
          <template #append>
            <el-button class="menu-input-button">搜索</el-button>
          </template>
        </el-input>
      </el-popover> -->
      <el-popover placement="bottom" :width="502" trigger="click">
        <template #reference>
          <img src="../assets/svg/menu.svg" class="menu-svg icon-bar" />
        </template>
        <div class="area-select-container">
          <AreaCascade></AreaCascade>
        </div>
      </el-popover>
      <el-popover placement="bottom" :width="80" trigger="click">
        <template #reference>
          <el-icon color="#4abce5" :size="24">
            <Setting />
          </el-icon>
        </template>
        <ul class="setting-ul">
          <li>
            <RouterLink to="/system">
              <el-icon color="#4abce5" :size="16">
                <Grid />
              </el-icon>
              <span>系统管理</span>
            </RouterLink>
          </li>
          <li>
            <el-icon color="#4abce5" :size="16">
              <SwitchButton />
            </el-icon>
            <span>退出登录</span>
          </li>
        </ul>
      </el-popover>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { menuList, menuType } from '@/constant';
import { busEventEnum, emitter } from '@/utils/bus';
import { Grid, Search, Setting, SwitchButton } from '@element-plus/icons-vue';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import AreaCascade from './AreaCascade.vue';
const input3 = ref('');
const router = useRouter();
const subTitle = ref('');
const menuShow = ref<boolean>(false);
const noIframe = computed(() => window.parent == window);
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    //要执行的方法
    if (toPath !== '/index' && !toPath.startsWith('/system')) {
      const menu: Array<menuType> = menuList.filter((e) => e.path === toPath);
      if (!menu.length) {
        subTitle.value = '';
        if (toPath.startsWith('/community')) {
          subTitle.value = '小区数据';
        } else if (toPath.startsWith('/car')) {
          subTitle.value = '车辆数据';
        } else if (toPath.startsWith('/special')) {
          subTitle.value = '特殊群体';
        } else if (toPath.startsWith('/warn')) {
          subTitle.value = '告警中心';
        } else {
          subTitle.value = '';
        }
      } else {
        subTitle.value = menu[0].name;
      }
    } else {
      subTitle.value = '';
    }
  },
  { immediate: true, deep: true }
);
const toggleMenu = () => {
  menuShow.value = !menuShow.value;
  emitter.emit(busEventEnum.menuShow, menuShow.value);
};
</script>
<style lang="scss" scoped>
.top-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  position: relative;
  padding-right: 20px;

  &:after {
    width: 100%;
    height: 1px;
    background: linear-gradient(135deg, rgba(104, 224, 253, 0.1) 0%, #4fcffb 51%, rgba(55, 190, 249, 0.1) 100%);
    opacity: 0.69;
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
  }

  .left {
    font-size: 20px;
    display: flex;
    color: var(--mainColor);
    align-items: center;
    margin-left: 20px;

    .icon-toggle {
      padding-top: 8px;
      width: 50px;
      text-align: center;
      cursor: pointer;
      transition: width 0.2s;
    }

    p {
      margin: 0 0;
    }

    .in {
      width: 150px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .icon-bar {
      margin: 0 40px;
      display: block;
    }

    >.el-icon {
      cursor: pointer;
    }

    .menu-svg {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}
</style>
