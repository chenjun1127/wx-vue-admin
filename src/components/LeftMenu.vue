<template>
  <header :class="['top-menu', obj.show ? 'in' : '']">
    <div class="left">
      <p>评价有礼</p>
      <div class="avatar">
        <div class="avatar-img">
          <img src="../assets/images/avatar.png" alt="" />
        </div>
        <div class="avatar-text" v-show="!obj.show">
          <h1>{{ userInfo.name }}</h1>
          <p>
            <span :class="`status-${userInfo.online == 1 ? '1' : '2'}`"></span><em>{{ userInfo.online == 1 ? '在线' : '离线' }}</em>
          </p>
        </div>
      </div>
      <Nav></Nav>
    </div>
  </header>
</template>
<script lang="ts" setup>
import Nav from '../components/Nav.vue';
import { userInfoStore } from '../stores/userInfo';
const userInfo = userInfoStore();
import { busEventEnum, emitter } from '@/utils/bus';
import { onBeforeMount, onMounted, reactive } from 'vue';
const obj = reactive<any>({
  show: false,
});
onMounted(() => {
  emitter.on(busEventEnum.menuShow, (res: any) => {
    obj.show = res;
  });
});
onBeforeMount(() => {
  emitter.off(busEventEnum.menuShow);
});
</script>
<style lang="scss" scoped>
.top-menu {
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
  color: #fff;
  &.in {
    .left {
      > p {
        width: 50px;
        height: 50px;
        overflow: hidden;
        font-size: 16px;
        padding: 0 5px;
      }
    }
    .avatar {
      height: 45px;
      &-img {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 30px;
          height: 30px;
          border-radius: 100%;
          display: block;
        }
      }
      &-text {
        font-size: 0;
        opacity: 0;
        width: 0;
      }
    }
  }
}
.left {
  > p {
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: block;
    width: 100%;
    @extend .width-transform;
  }
  .avatar {
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 45px;
    &-img {
      width: 45px;
      height: 45px;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 45px;
        height: 45px;
        border-radius: 100%;
        display: block;
      }
    }
    &-text {
      font-size: 14px;
      color: #fff;
      margin-left: 15px;
      h1 {
        font-size: 14px;
      }
      p {
        position: relative;
        display: flex;
        align-items: center;
        span {
          margin-right: 5px;
          width: 10px;
          height: 10px;
          font-size: 0;
          line-height: 0;
          border-radius: 100%;
          background-color: #18bc9c;
          display: block;
          &.status-1 {
            background-color: #18bc9c;
          }
          &.status-2 {
            background-color: red;
          }
        }

        em {
          font-style: normal;
        }
      }
    }
  }
}
</style>
