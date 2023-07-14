<template>
  <ul class="img-list" v-if="type == 0" :style="style">
    <li v-for="(item, index) in list" :key="item.recordId" :style="{ backgroundImage: `url(${item.face})` }"
      @click="handleClick(item.face)">
      <p>{{ item.name }}</p>
    </li>
  </ul>
  <ul class="img-list" v-else-if="type == 1" :style="style">
    <li v-for="(item, index) in list" :key="item.recordId" :style="{ backgroundImage: `url(${item.picKey})` }"
      @click="handleClick(item.picKey)">
      <p>{{ item.caridNumbercn }}</p>
    </li>
  </ul>
  <ul class="img-list" v-else-if="type == 2" :style="style">
    <li v-for="(item, index) in list" :key="item.recordId" :style="{ backgroundImage: `url(${item.face})` }"
      @click="handleClick(item.face)">
      <p>{{ item.name }}</p>
    </li>
  </ul>
  <ul class="img-list" v-else :style="style">
    <li v-for="(item, index) in list" :key="item.recordId" :style="{ backgroundImage: `url(${item.face})` }"
      @click="handleClick(item.face)">
      <p>{{ item.name }}</p>
    </li>
  </ul>
  <Dialog :visible="obj.isShow" @handleClose="handleClose" title="图片预览" :noFooter="true">
    <template #content>
      <div class="img-preview">
        <img :src="obj.currentImg" alt="" />
      </div>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue';
const props = defineProps({
  list: {
    type: Array<any>,
    default: []
  },
  isActivePreview: {
    type: Boolean,
    default: true
  },
  type: {
    type: Number,
    default: 0 //0->门禁,1->车辆,2->人脸,3->门锁
  }
});
const obj = reactive({
  isShow: false,
  currentImg: ''
});
const handleClick = (src: string) => {
  if (props.isActivePreview) {
    obj.isShow = true;
    obj.currentImg = src;
  }
};
const handleClose = () => {
  obj.isShow = false;
  obj.currentImg = '';
};
const style = computed(() => {
  if (props.list.length < 4) {
    return { justifyContent: 'flex-start' };
  }
  return { justifyContent: 'space-between' };
});
</script>
<style scoped lang="scss">
.img-list {
  display: flex;
  list-style: none;
  flex: auto;
  padding: 0;
  justify-content: space-between;
  width: 100%;

  li {
    margin-right: 20px;
    padding: 0;
    position: relative;
    height: 100%;
    width: calc((100% - 60px) / 4);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    p {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      background-color: rgba($color: #000000, $alpha: 0.6);
      color: rgba(58, 198, 244, 0.7);
      text-align: center;
      margin: 0;
      width: 100%;
    }
  }
}

.img-preview {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  >img {
    display: block;
    overflow: hidden;
    margin: 0 auto;
    max-width: 600px;
  }
}
</style>
