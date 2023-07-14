<template>
  <div :class="['common-title', isShowBg ? 'common-title-bg' : '']">
    <span>{{ title }}</span>
    <p v-if="isShowMsg">{{ msg }}</p>
    <RouterLink v-if="path" :to="path">更多>></RouterLink>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  path: {
    type: String,
    default: '',
  },
  msg: {
    type: String,
    default: '今日抓拍0次',
  },
  isShowBg: {
    type: Boolean,
    default: false,
  },
  isShowMsg: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped lang="scss">
.common-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  font-size: 12px;

  p {
    color: #fff;
    font-size: 14px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 12px;
  }

  &.common-title-bg {
    position: relative;

    &::before {
      content: '';
      width: 3px;
      height: 1.3vh;
      background-color: #27c6ff;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
