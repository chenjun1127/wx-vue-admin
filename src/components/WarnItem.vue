<template>
  <div class="warn-item">
    <p>{{ warnTotal }}</p>
    <div class="warn-item-title">{{ warnTitle }}</div>
    <div class="warn-icon-item" v-if="showIcon">
      <div>
        <el-icon>
          <WarnTriangleFilled />
        </el-icon>
        <span>{{ warnCount1 }}</span>
      </div>
      <div>
        <el-icon>
          <WarnTriangleFilled />
        </el-icon>
        <span>{{ warnCount2 }}</span>
      </div>
      <div>
        <el-icon>
          <WarnTriangleFilled />
        </el-icon>
        <span>{{ warnCount3 }}</span>
      </div>
      <div>
        <el-icon>
          <WarnTriangleFilled />
        </el-icon>
        <span>{{ warnCount4 }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { WarnTriangleFilled } from '@element-plus/icons-vue';
defineProps({
  warnTitle: {
    type: String,
    default: '今日告警',
  },
  warnTotal: {
    type: Number,
    default: 0,
  },
  warnCount1: {
    type: Number,
    default: 0,
  },
  warnCount2: {
    type: Number,
    default: 0,
  },
  warnCount3: {
    type: Number,
    default: 0,
  },
  warnCount4: {
    type: Number,
    default: 0,
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped lang="scss">
.warn-item {
  box-shadow: 0 0 5px 0 rgb(39 198 255 / 52%);
  max-height: 114px;
  min-width: 100px;
  text-align: center;
  height: 114px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  > p {
    background:   url(../assets/images/num-bg.png) no-repeat center;
    background-size: 130% 130%;
    font-size: 32px;
    position: relative;
    display: flex;
    align-items: center;
    color: #fff;
    height: 50px;
  }

  div {
    font-size: 14px;
  }

  &-title {
    padding: 0 5px;
  }
}

.warn-icon-item {
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    margin: 0 4px;
    display: flex;
    align-items: center;

    > i {
      font-size: 18px;
    }

    &:nth-child(1) {
      color: #ff8623;
    }

    &:nth-child(2) {
      color: red;
    }

    &:nth-child(3) {
      color: #4abce5;
    }

    &:nth-child(4) {
      color: #ffc423;
    }
  }
}
</style>
