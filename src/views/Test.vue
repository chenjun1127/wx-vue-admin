<template>
  <div>
    <!-- <div>openid:{{ obj.code }}</div> -->
  </div>
</template>

<script lang="ts" setup>
import wx from 'weixin-js-sdk';
import { onMounted, reactive } from 'vue';
import { getQueryString } from '@/utils/utils';
import api from '@/api';

const obj = reactive<any>({
  code: '',
});
onMounted(async () => {
  obj.code = getQueryString('code');
  console.log('code' + obj.code);
  var value: any = await api.getOpenId(obj.code);

  //跳转回小程序的登录页面并将公众号openid带过去
  wx.miniProgram.redirectTo({
    url: '/pages/logs/logs?myOpenId=' + value,
  });
});
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;

  aside {
    background-color: #222d32;
    height: 100vh;
    width: 230px;

    @extend %width-transform;

    &.in {
      width: 50px;
    }
  }

  section {
    flex: 1;
    display: flex;
    flex-direction: column;
    .section-view {
      background-color: #fff;
      border-radius: 3px;
      margin: 15px;
      flex: 1;
      overflow-y: scroll;
    }
  }
}
</style>
