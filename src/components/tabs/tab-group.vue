<template>
  <div class="tab-group">
    <!-- tabRef 这块本来是用来实现下划线动态切换特效的，暂时没有写效果 -->
    <div ref="barRef" class="tab-bar" :style="{ width: widthRef + 'px' }"></div>
    <div ref="titsRef" class="tab-header" layout="row" layout-wrap>
      <div ref="titRef" :class="[{ active: activeKey === (item.props?.actKey ?? '') }, 'tab-nav']" v-for="(item, index) in tabTitList" :key="index" @click="onTabClick($event, item, index)">
        {{ item.props?.label }}
      </div>
    </div>
    <div class="tab-panel">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, provide, ref, toRefs, useSlots } from 'vue';
const tabTitList: any = ref([]);
const props = defineProps({
  defaultKey: {
    type: String,
    default: '1',
  },
});
const slots = useSlots();
const { activeKey, barRef, titsRef, widthRef } = toRefs({
  activeKey: ref(props.defaultKey), // 当前key
  barRef: ref<HTMLElement | null>(null),
  titsRef: ref<HTMLElement | null>(null),
  widthRef: ref(),
});
provide('activeKey', activeKey);

onMounted(() => {
  // 设置状态线初始化宽度
  if (titsRef.value && titsRef.value.clientWidth) {
    // widthRef.value = titsRef.value.clientWidth;
  }
  // 获取插槽内容
  tabTitList.value = slots.default ? slots.default() : [];
});
const onTabClick = (_event: any, tab: { props: { actKey: string } }, _index: any) => {
  activeKey.value = tab.props?.actKey ?? '';
};
</script>

<style scoped lang="scss">
.tab-group {
  // .tab-bar {
  //   position: absolute;
  //   left: 0;
  //   border-bottom: 2px solid #409eff;
  // }
  .tab-header {
    box-shadow: 0 1px 0 #ddd;
    &:after {
      content: '';
      width: 100%;
      border-bottom: 2px solid #ddd;
    }
  }

  .tab-nav {
    color: #5c5c5c;
    font-size: 14px;
    line-height: 40px;
    display: inline-block;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    padding: 0 15px;

    &.active {
      color: #18bc9c;
      // border-bottom-color: #18bc9c;
      background-color: #f3f3f3;
    }
  }

  .tab-panel {
    padding: 15px 0;
  }
}
</style>
