<template>
  <svg :class="svgClass" aria-hidden="true" @click="emit('on-click')" :style="styleExternalIcon">
    <use :xlink:href="iconClassName" :fill="props.color" />
  </svg>
</template>

<script setup lang="ts">

import { computed } from 'vue';

const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  //自定义颜色
  color: {
    type: String,
    default: '#ffffff'
  },
  size: {
    type: String || Number,
    default: '20', 
  },
});

// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`;
});

// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return 'svg-icon';
});
const styleExternalIcon = computed(() => ({
  width: props.size + 'px',
  height: props.size + 'px',
}));
const emit = defineEmits(['on-click']);
</script>

<style scoped>
.svg-icon {
  position: relative;
  color: currentColor;
  display: flex;
  justify-content: center;
  align-items: center; 
}
</style>
