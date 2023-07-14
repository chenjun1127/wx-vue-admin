<template>
  <div class="common-card" :class="className" @click="handleClick" :style="style">
    <div class="common-card-title">
      <slot name="title"></slot>
    </div>
    <div class="common-card-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { StyleValue } from 'vue';
defineProps<{
  style?: StyleValue;
  className?: string;
}>();

const emits = defineEmits(['handleClick']);
const handleClick = () => {
  emits('handleClick');
};
</script>
<style lang="scss" scoped>
.common-card {
  position: relative;
  background: rgba(105, 204, 239, 0.05);
  box-shadow: 0px 0px 12px 0px #71caff inset !important;
  border: none !important;
  padding-bottom: 0 !important;
  transition: all 0.25s;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: rgba(105, 204, 239, 0.15);
  }

  &-title {
    background: linear-gradient(90deg, rgba(105, 204, 239, 0.2) 0%, rgba(105, 203, 238, 0) 100%);
    padding: 10px;
  }

  &-content {
    font-size: 12px;
    padding: 20px 10px;
  }
}
</style>
