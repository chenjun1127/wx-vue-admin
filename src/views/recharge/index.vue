<template>
  <div class="inner">
    <el-form :inline="true" :model="ruleForm" ref="formInlineRef" class="common-form-inline" :rules="rules">
      <el-form-item label-width="85" prop="orderNum" label="订单号">
        <el-input v-model="ruleForm.orderNum" placeholder="订单号" maxlength="18" clearable style="width: 200px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="startMoney" label="充值金额">
        <el-input v-model="ruleForm.startMoney" placeholder="充值金额" maxlength="18" clearable style="width: 85px"> </el-input>
        <span class="space-tips">-</span>
        <el-input v-model="ruleForm.endMoney" placeholder="充值金额" maxlength="18" clearable style="width: 85px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" label="创建时间">
        <el-date-picker v-model="ruleForm.submitTime" type="date" label="创建时间" placeholder="请选择" style="width: 200px" />
      </el-form-item>
      <el-form-item label-width="85">
        <el-button class="custom-button-0" @click="submitForm(formInlineRef)">提交</el-button>
        <el-button @click="resetForm(formInlineRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="form-buttons-bar">
      <el-button class="custom-button-3">$充值金额：{{ obj.recMoneys }}元</el-button>
    </div>
    <CommonTable :tableData="ruleForm.list" :tableCol="ruleForm.tableCol" @handleSelectionChange="handleSelectionChange">
      <template v-slot:recSta="slotProps">
        <span :class="`status-${slotProps.info.recSta}`">{{ getrecStaStateString(slotProps.info.recSta) }}</span>
      </template>
    </CommonTable>
    <Pagination :pageSize="ruleForm.pageSize" :pageTotal="ruleForm.total" @pageFunc="pageFunc" :currentPage="ruleForm.currentPage" @handleChange="handleChange"></Pagination>
  </div>
</template>
<script lang="ts" setup>
import api from '@/api';
import CommonTable from '@/components/CommonTable.vue';
import Pagination from '@/components/Pagination.vue';
import { recStaStateString } from '@/constant/object';
import { formatTime } from '@/utils/utils';
import { type FormInstance, type FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
const emits = defineEmits(['handleSubmit', 'handleReset']);
const formInlineRef = ref<FormInstance>();
const ruleForm = reactive<any>({
  orderNum: '',
  startMoney: '',
  endMoney: '',
  submitTime: '',
  list: [] as any[],
  total: 0,
  pageNum: 1, //当前页,从第0页开始查
  pageSize: 10, //每页条目数
  currentPage: 1,
  tableCol: [
    {
      prop: 'id',
      label: 'ID',
    },
    {
      prop: 'orderNum',
      label: '订单号',
    },
    {
      prop: 'rechAmount',
      label: '充值金额',
    },
    {
      prop: 'recSta',
      label: '充值状态',
      tooltip: false,
      slot: 'recSta',
    },
    {
      prop: 'disTime',
      label: '创建时间',
    },
  ],
});
const obj = reactive<any>({
  selectedRows: <any>[],
  recMoneys: 0,
});
const rules = reactive<FormRules>({});
onMounted(() => {
  getData();
});
const getData = async () => {
  const data = await api.queryReCharge({
    pages: ruleForm.pageNum,
    pageSize: ruleForm.pageSize,
    map: {
      orderNum: ruleForm.orderNum,
      maxMoney: ruleForm.endMoney,
      minMoney: ruleForm.startMoney,
      disTime: formatTime(ruleForm.submitTime),
    },
  });
  const { page, extra } = data;
  obj.recMoneys = extra.recMoneys;
  ruleForm.list = page.records;
  ruleForm.total = page.total;
};
const handleChange = (val: number) => {
  ruleForm.currentPage = val;
  ruleForm.pageNum = val;
  getData();
};
const pageFunc = (data: { pageSize: any; pageNum: any }) => {
  ruleForm.pageSize = data.pageSize;
  ruleForm.pageNum = data.pageNum;
  getData();
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      getData();
      emits('handleSubmit', ruleForm);
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  getData();
  emits('handleReset', ruleForm);
};
const handleSelectionChange = (rows: any) => {
  obj.selectedRows = rows;
};
const getrecStaStateString = (e: any) => {
  if (!e) return '';
  return (recStaStateString as any)[e];
};
</script>

<style lang="scss">
.space-tips {
  display: inline-block;
  width: 30px;
  color: #333;
  text-align: center;
}

.form-buttons-bar {
  margin-bottom: 15px;
}
.status-NS {
  color: red;
}
.status-OK {
  color: rgb(24, 188, 156);
}
.status-SS {
  color: rgb(234, 185, 60);
}
</style>
