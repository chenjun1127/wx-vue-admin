<template>
  <main class="main">
    <aside :class="obj.show ? 'in' : ''">
      <LeftMenu></LeftMenu>
    </aside>
    <section>
      <TopBar></TopBar>
      <div class="section-view">
        <el-config-provider :locale="zhCn">
          <router-view />
        </el-config-provider>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { busEventEnum, emitter } from '@/utils/bus';
import { onBeforeMount, onMounted, reactive } from 'vue';
import LeftMenu from '../components/LeftMenu.vue';
import TopBar from '../components/TopBar.vue';
const obj = reactive<any>({
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
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;

  aside {
    background-color: #222d32;
    height: 100vh;
    width: 230px;

    @extend %width-transform;

    &.in {
      width: 50px;
    }
  }

  section {
    flex: 1;
    display: flex;
    flex-direction: column;
    .section-view {
      background-color: #fff;
      border-radius: 3px;
      margin: 15px;
      flex: 1;
      overflow-y: scroll;
    }
  }
}
</style>
