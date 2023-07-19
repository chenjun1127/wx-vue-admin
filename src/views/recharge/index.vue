<template>
  <main class="inner">
 
    <CommonTable :tableData="obj.list" :tableCol="obj.tableCol" isOrdered>
      <template v-slot:img="slotProps">
        <el-popover placement="right" show-arrow width="300" popper-class="table-popover" trigger="hover">
          <template #reference>
            <div class="table-img-bg" :style="{ backgroundImage: 'url(' + slotProps.info.img + ')' }"></div>
          </template>
          <img :src="slotProps.info.img" class="table-img" style="max-width: 300px" />
        </el-popover>
      </template>
      <!-- <template v-slot:feedbackType="slotProps">
        <span :class="`repair-type-${slotProps.info.feedbackType}`">{{ feedbackType[(slotProps as any).info.feedbackType]
        }}</span>
      </template>
      <template v-slot:status="slotProps">
        <span :class="`repair-status-${slotProps.info.status}`">{{ repairStatus[(slotProps as any).info.status] }}</span>
      </template> -->
    </CommonTable>
    <Pagination :pageSize="obj.pageSize" :pageTotal="obj.total" @pageFunc="pageFunc" :currentPage="obj.currentPage"
      @handleChange="handleChange"></Pagination>
  </main>
</template>
<script setup lang="ts">
 
 
import CommonTable from '@/components/CommonTable.vue';
import Pagination from '@/components/Pagination.vue';
import { onMounted, reactive } from 'vue';
 
const obj = reactive<any>({
  list: [] as any[],
  total: 0,
  pageNum: 1, //当前页,从第0页开始查
  pageSize: 10, //每页条目数
  currentPage: 1,
  tableCol: [
    {
      prop: 'streetName',
      label: '街道',
    },
    {
      prop: 'villageName',
      label: '社区',
    },
    {
      prop: 'contactName',
      label: '报修人',
    },
    {
      prop: 'mobile',
      label: '手机号码',
    },
    {
      prop: 'address',
      label: '位置',
    },

    {
      prop: 'feedbackType',
      label: '报修类型',
      slot: 'feedbackType',
    },
    {
      prop: 'content',
      label: '反馈内容',
    },
    {
      prop: 'img',
      label: '图片',
      slot: 'img',
    },
    {
      prop: 'status',
      label: '处理状态',
      slot: 'status',
    },
    {
      prop: 'createTime',
      label: '预约时间',
    },
  ],

  mobile: '',
  idCard: '',
  realName: '',
  gridName: ''
});
// const getFeedbackDetail = async (params: any) => {
//   const { rows, total } = await api.queryFeedbackDetail(params);
//   console.log(rows);
//   obj.list = !rows.length ? [] : rows;
//   obj.total = total;
// };

const handleChange = (val: number) => {
  obj.currentPage = val;
  obj.pageNum = val;
  // getFeedbackDetailAsync();
};
const pageFunc = (data: { pageSize: any; pageNum: any }) => {
  obj.pageSize = data.pageSize;
  obj.pageNum = data.pageNum;
  // getFeedbackDetailAsync();
};
onMounted(async () => {
  // getFeedbackDetailAsync();
});
 

// const handleSubmit = (value: any) => {
//   obj.realName = value.name;

//   getFeedbackDetailAsync();
// };
// const handleReset = () => {
//   obj.realName = '';
//   obj.mobile = '';
//   obj.idCard = '';
//   obj.gridName = '';
//   getFeedbackDetailAsync();
// };
// const getFeedbackDetailAsync = () => {
//   const { level, code } = areaSelect.currentArea.data;
//   getFeedbackDetail(getParamsObj({ ...getDefaultParamsByLevel(areaSelect.currentArea.data.level, areaSelect.currentArea.data.code), ...getParamsByLevel(level, code), ...commonParams() }));
// };

// const commonParams = (): any => {
//   return { pageNum: obj.pageNum, pageSize: obj.pageSize, timestamp: Date.now(), real_name: obj.realName, grid_name: obj.gridName };
// };
</script>
<style scoped lang="scss">
 

.repair-status-0 {
  color: #ff9900;
}

.repair-status-1 {
  color: #db16a7;
}

.repair-status-2 {
  color: #2ce607;
}

.repair-status-3 {
  color: #070be6;
}

.repair-type-0 {
  color: #ff9900;
  border: 1px solid #ff9900;
  padding: 2px 2px;
  border-radius: 3px;
}

.repair-type-1 {
  color: #db16a7;
  border: 1px solid #db16a7;
  padding: 2px 2px;
  border-radius: 3px;
}

.repair-type-2 {
  color: #2ce607;
  border: 1px solid #2ce607;
  padding: 2px 2px;
  border-radius: 3px;
}

.repair-type-3 {
  color: #070be6;
  border: 1px solid #070be6;
  padding: 2px 2px;
  border-radius: 3px;
}

.repair-type-4 {
  color: #ad0b24;
  border: 1px solid #ad0b24;
  padding: 2px 2px;
  border-radius: 3px;
}
</style>
