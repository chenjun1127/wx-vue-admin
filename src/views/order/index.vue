<template>
  <TabGroup defaultKey="1">
    <TabPanel actKey="1" label="进行中">进行中-内容</TabPanel>
    <TabPanel actKey="2" label="已结束">已结束-内容</TabPanel>
    <TabPanel actKey="3" label="全部">全部-内容</TabPanel>
  </TabGroup>
</template>
<script lang="ts" setup>
import TabGroup from '@/components/tabs/tab-group.vue';
import TabPanel from '@/components/tabs/tab-panel.vue';
</script>
