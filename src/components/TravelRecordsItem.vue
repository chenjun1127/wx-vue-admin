<template>
  <div class="travel-records-item-list">
    <div v-for="(item, index) in list" key="index">
      <img :src="getAssetsImages(index)" alt="" />
      <div>
        <p>{{ item.count }}</p>
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  list: {
    default: () => [],
    type: Array<any>,
  },
});

const getAssetsImages = (index: number) => {
  return new URL(`../assets/images/snap-data-${index + 1}.png`, import.meta.url).href;
};
</script>
<style lang="scss" scoped>
.travel-records-item-list {
  padding: 0 20px 20px 20px;
  display: flex;
  align-items: center;
  flex: auto;
  position: relative;
  flex-wrap: wrap;
  > div {
    width: 50%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-left: 10px;
    color: #3ac6f4;
    > img {
      width: 75px;
      height: 75px;
      display: block;
    }
    > div {
      p {
        font-size: 20px;
        margin-bottom: 5px;
      }
      div {
        font-size: 12px;
      }
    }
  }
}
</style>
