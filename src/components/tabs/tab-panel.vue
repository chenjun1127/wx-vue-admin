<template>
  <div v-show="actKey == activeKey">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { inject } from 'vue';

defineProps({
  actKey: {
    type: String,
    default: '1'
  },
  label: {
    type: String,
    default: '全部'
  }
});
const activeKey = inject("activeKey");
</script>
