<template>
  <div class="silde_box">
    <slide-verify class="silde_box" ref="block" :slider-text="text" :accuracy="accuracy" @again="onAgain" @success="onSuccess" @fail="onFail" @refresh="onRefresh"></slide-verify>
    <button class="btn" @click="handleClick">在父组件可以点我刷新哦</button>
    <div>{{ msg }}</div>
  </div>
</template>
<script lang="ts" setup>
import SlideVerify, { SlideVerifyInstance } from 'vue3-slide-verify';
import 'vue3-slide-verify/dist/style.css';
import { reactive, ref } from 'vue';
const msg = ref('');
const block = ref<SlideVerifyInstance>();

const onAgain = () => {
  msg.value = '检测到非人为操作的哦！ try again';
  // 刷新
  block.value?.refresh();
};

const onSuccess = (times: number) => {
  msg.value = `login success, 耗时${(times / 1000).toFixed(1)}s`;
};

const onFail = () => {
  msg.value = '验证不通过';
};

const onRefresh = () => {
  msg.value = '点击了刷新小图标';
};

const handleClick = () => {
  // 刷新
  block.value?.refresh();
  msg.value = '';
};
</script>

<style scoped>
.silde_box {
  margin: 0 auto;
}
</style>
