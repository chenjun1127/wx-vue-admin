<template>
  <div class="inner">
    <TabGroup defaultKey="1">
      <TabPanel actKey="1" label="审核管理">
        <CheckManage></CheckManage>
      </TabPanel>
      <TabPanel actKey="2" label="评价有礼设置">
        <OrderSetting></OrderSetting>
      </TabPanel>
    </TabGroup>
  </div>
</template>
<script lang="ts" setup>
import TabGroup from '@/components/tabs/tab-group.vue';
import TabPanel from '@/components/tabs/tab-panel.vue';
import CheckManage from './CheckManage.vue';
import OrderSetting from './OrderSetting.vue';
</script>
 
