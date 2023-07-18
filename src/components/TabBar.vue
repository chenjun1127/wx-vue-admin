<template>
  <div class="tab-bar-list" :class="className">
    <div v-for="(item, index) in list" @click="change(index)" key="index" :class="currentIndex == index ? 'active' : ''">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['change']);
defineProps({
  currentIndex: {
    default: 0,
    type: Number
  },
  list: {
    default: () => ['标签一', '标签二'],
    type: Array<any>
  },
  className: {
    type: String
  }
});
const change = (index: any) => {
  emits('change', index);
};
</script>
<style lang="scss" scoped>
.tab-bar-list {
  display: flex;
  align-items: center;
  height: 72px;
  position: relative;
  padding: 0 20px;
  position: relative;
  align-items: center;

  >div {
    margin: 0 20px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    color: #333;

    &.active {
      font-size: 16px;
    }
  }
}
</style>
