<template>
  <div class="common-tabs">
    <div class="common-tabs-bar">
      <div class="common-tabs-item" v-for="(tab, index) in tabList"
        :class="[tabIndex == tab.index ? 'tabs-active' : '']" :style="tab.style" @click="changeTab(tab)" :key="index">
        {{ tab.name }}
      </div>
    </div>
    <div class="common-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup> 
const emits = defineEmits(['changeTab']);
defineProps({
  tabList: {
    type: Array<any>
  },
  tabIndex: {
    type: Number,
    default: 0
  }
});
const changeTab = (tab: any) => {
  emits('changeTab', tab);
};
</script>
<style lang="scss" scoped>
.common-tabs {
  font-size: 14px;

  .common-tabs-bar {
    position: relative;
    margin: 0 auto;
    height: 40px;

    .common-tabs-item {
      display: inline-block;
      padding: 0 5px;
      border: 1px solid rgba(58, 198, 244, 0.7);
      color: #3ac6f4;
      box-sizing: border-box;
      border-right: none;
      position: relative;
      ;
      text-align: center;
      height: 40px;
      line-height: 40px;
      cursor: pointer;

      &:last-child {
        border-right: 1px solid rgba(58, 198, 244, 0.7);
        border-radius: 0 5px 0 0;
      }

      &:first-child {
        border-radius: 5px 0 0 0;
      }

      &.tabs-active {
        background-color: rgba(58, 198, 244, 0.2);
      }

      &:hover {
        @extend .tabs-active;
      }
    }
  }
}
</style>