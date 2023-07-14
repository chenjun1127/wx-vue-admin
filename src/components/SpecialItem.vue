<template>
  <div class="special-item-card" :class="className" :style="style">
    <div class="special-item-card-left">
      <img src="" alt="" />
    </div>
    <div class="special-item-card-right">
      <div class="special-item-card-tips" @click="handleDialog">标记</div>
      <div class="special-item-card-title">粤BD3332S1s</div>
      <div class="special-item-card-li">
        <p>
          <span>
            <Iphone />
          </span>
          <em>13456521247</em>
        </p>
        <p>
          <span>
            <Postcard />
          </span>
          <em>420323198741522351</em>
        </p>
        <p>
          <span>
            <Location />
          </span>
          <em>廣東省深圳市龍華區民治街道東邊新村501</em>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Iphone, Location, Postcard } from '@element-plus/icons-vue';
import type { StyleValue } from 'vue';
defineProps<{
  style?: StyleValue;
  className?: string;
}>();

const emits = defineEmits(['handleDialog']);

const handleDialog = () => {
  console.log(222);
  emits('handleDialog');
};
</script>
<style lang="scss" scoped>
.special-item-card {
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid #69c5ea;
  padding: 24px;
  transition: all 0.25s;
  border-radius: 5px;
  cursor: pointer;
  display: flex;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &-left {
    width: 140px;
    height: 172px;
    border: 1px solid #fff;
    margin-right: 24px;
    border-radius: 6px;
  }

  &-right {
    flex: auto;
    font-size: 14px;
    position: relative;

    .special-item-card-tips {
      z-index: 1;
      position: absolute;
      right: 0;
      top: 0;
      width: 72px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      background-color: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(105, 197, 234, 0.41);
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
    }
  }

  &-title {
    margin-bottom: 10px;
  }

  &-li {
    p {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      line-height: 1.8em;
      em {
        font-style: normal;
        display: inline-block;
        margin-left: 10px;
      }

      span {
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:last-child {
        align-items: flex-start; 
        span {
          width: 20px;
          height: 20px;
          justify-content: flex-start;
          display: flex; 
        }
      }
    }
  }
}
</style>
