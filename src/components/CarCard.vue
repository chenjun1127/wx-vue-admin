<template>
  <div class="common-car-card" :class="className" @click="handleClick" :style="style">
    <div class="common-car-card-left" v-if="item.pic_key != null && item.pic_key != '' && item.pic_key.indexOf(null) == -1" :style="{ backgroundImage: `url(${getImg(item)})` }"></div>
    <div class="common-car-card-left-no" v-else>暂无图片</div>
    <div class="common-car-card-right">
      <div class="common-car-card-title">{{ item.caridNumbercn }}</div>
      <div class="common-car-card-li">
        <p>
          <span>车主姓名</span>
          <em>{{ item.owner_name }}</em>
        </p>
        <p>
          <span>联系电话</span>
          <em>{{ item.mobile }}</em>
        </p>
        <p>
          <span>车牌号码</span>
          <em>{{ item.carid_numberCN }}</em>
        </p>
        <p>
          <span>月卡时间</span>
          <em>{{ dayjs(item.begin_time).format('YYYY-MM-DD') }}-{{ dayjs(item.end_time).format('YYYY-MM-DD') }}</em>
        </p>
        <p>
          <span>月卡状态</span>
          <em :class="['warn', getCardStatusClass(item)]">{{ getCardStatusText(item) }}</em>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { dayjs } from 'element-plus';
import type { StyleValue } from 'vue';
defineProps<{
  style?: StyleValue;
  className?: string;
  item?: any;
}>();

const emits = defineEmits(['handleClick']);
const handleClick = (item) => {
  emits('handleClick', item);
};
const getCardStatusText = (item: any): string => {
  if (item.status == 0) {
    return '正常';
  } else if (item.status == 1) {
    return '过期';
  } else {
    return '未知';
  }
};
const getCardStatusClass = (item: any): string => {
  if (item.status == 0) {
    return 'status-1';
  } else if (item.status == 1) {
    return 'status-2';
  } else {
    return 'status-3';
  }
};
const getImg = (item: any) => {
  return item.pic_key;
};
</script>
<style lang="scss" scoped>
.common-car-card {
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid #69c5ea;
  padding: 24px;
  transition: all 0.25s;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  width: 25%;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &-left {
    width: 140px;
    height: 172px;
    border: 1px solid #fff;
    margin-right: 24px;
    border-radius: 6px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  &-left-no {
    color: #69c5ea;
    width: 140px;
    height: 172px;
    border: 1px solid #fff;
    margin-right: 24px;
    border-radius: 6px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-right {
    flex: auto;
    font-size: 14px;
  }

  &-title {
    margin-bottom: 10px;
  }

  &-li {
    p {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      em {
        font-style: normal;
        display: inline-block;
        margin-left: 10px;

        &.warn {
          height: 24px;
          line-height: 24px;
          padding: 0 5px;
          display: inline-block;

          font-size: 14px;
        }

        &.status-1 {
          background-color: #195655;
          border: 1px solid #2a8375;
          color: #44c9a6;
        }
        &.status-2 {
          border: 1px solid #3ac6f4;
          color: #3ac6f4;
        }
        &.status-3 {
          border: 1px solid red;
          color: red;
        }
      }
    }
  }
}
</style>
