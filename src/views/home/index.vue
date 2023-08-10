<template>
  <div class="home-container">
    <ol>
      <li v-for="(item, index) in obj.list" :key="index">
        <div :class="['pic', `pic-${index}`]">
          <svg-icon :iconName="getIconName(index)" color="#fff" size="36"></svg-icon>
        </div>
        <div class="text">
          <h1>{{ item.count }}</h1>
          <p>{{ item.name }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>
<script lang="ts" setup>
import api from '@/api';
import { onMounted, reactive } from 'vue';
const obj = reactive({
  list: [
    {
      name: '今天提交订单数',
      count: 0,
    },
    {
      name: '今日返现红包数',
      count: 0,
    },
    {
      name: '今日返现金额',
      count: 0,
    },
    {
      name: '今日充值金额',
      count: 0,
    },
  ],
});
onMounted(async () => {
  const data = await api.getTodayShow();
  const { comments, rechr, redSc, redpack } = data.extra;
  obj.list[0].count = comments;
  obj.list[1].count = rechr;
  obj.list[2].count = redSc;
  obj.list[3].count = redpack;
});
const getIconName = (index: number) => {
  if (index === 0) {
    return 'icon-renminbi';
  } else if (index === 1) {
    return 'icon-hongbao';
  } else if (index === 2) {
    return 'icon-dingdan';
  } else {
    return 'icon-baobao';
  }
};
</script>
<style lang="scss" scoped>
.home-container {
  padding: 30px;

  ol {
    list-style: none;
    padding: 0;
    flex-direction: row;
    display: flex;
    border-bottom: 1px solid #f3f3f3;
    padding: 20px 0 30px 0;

    li {
      width: 25%;
      display: flex;
      align-items: center;

      .pic {
        width: 60px;
        height: 60px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;

        &-0 {
          background-color: #27c24c;
        }

        &-1 {
          background-color: #f05050;
        }

        &-2 {
          background-color: #7266ba;
        }

        &-3 {
          background-color: #23b7e5;
        }
      }

      .text {
        margin-left: 15px;
        height: 60px;

        p {
          font-size: 14px;
        }

        h1 {
          font-size: 26px;
        }
      }
    }
  }
}
</style>
