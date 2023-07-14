<template>
  <div class="special-card" >
    <div class="special-card-count">{{ count }}</div>
    <div class="special-card-tips">{{ name }}</div>
    <!-- <div class="special-card-detail">详情</div> -->
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
defineProps<{
  count: number;
  name: string;
  id: string;
}>();
// const handleClick = (name: any) => {
//   router.push(`/special/care?title=${name}`);
// };
</script>
<style lang="scss" scoped>
.special-card {
  border: 1px solid #0a2653;
  background-color: rgba(15, 17, 38, 0.7);
  border-radius: 5px;
  height: 154px;
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border-color: #4fcffb;
  }
  &-count {
    color: #fff;
    font-size: 26px;
    margin-bottom: 20px;
  }
  &-tips {
    font-size: 16px;
    color: #27c6ff;
  }
  &-detail {
    width: 60px;
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    position: absolute;
    right: 20px;
    top: 20px;
    opacity: 0.7;
    color: #69c5ea;
    border: 1px solid #69c5ea;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
