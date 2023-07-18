<template>
  <main class="main">
    <aside :class="obj.show ? 'in' : ''">
      <LeftMenu></LeftMenu>
    </aside>
    <section>
      <TopBar></TopBar>
      <div class="section-view">
        <RouterView></RouterView>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
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
  width: 100%;
  flex-direction: row;
  height: 100vh;

  aside {
    width: 230px;
    @extend .width-transform;
    height: 100vh;
    background-color: #222d32;
    &.in {
      width: 50px;
    }
  }

  section {
    flex: auto;
    .section-view {
      margin: 10px;
      background-color: #fff;
      border-radius: 3px;
    }
  }
}
</style>
