<template>
  <div class="top-back" :class="className" >
    <div class="top-back-img" @click="handleClick">
      <img src="../assets/images/back.png" alt="back" />
      <span>返回</span>
    </div>
    <slot name="content"></slot>
  </div>
</template>
<script lang="ts" setup>
const emits = defineEmits(['handleClick']);
defineProps<{
  className?: string;
}>();
const handleClick = () => {
  emits('handleClick');
};
</script>
<style lang="scss" scoped>
.top-back {
  padding: 1.2vh 10px;
  display: flex;
  &-img {
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 52px;
      height: 52px;
    }
  }
}
</style>
