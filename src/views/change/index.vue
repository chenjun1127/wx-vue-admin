<template>
  <div class="inner">
    <el-form :inline="true" :model="ruleForm" ref="formInlineRef" class="common-form-inline" :rules="rules">
      <el-form-item label-width="85" prop="startMoney" label="操作前">
        <el-input v-model="ruleForm.aMinMoney" placeholder="操作前" maxlength="18" clearable style="width: 85px"> </el-input>
        <span class="space-tips">-</span>
        <el-input v-model="ruleForm.aMaxMoney" placeholder="操作后" maxlength="18" clearable style="width: 85px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="startMoney" label="金额">
        <el-input v-model="ruleForm.bMinMoney" placeholder="金额" maxlength="18" clearable style="width: 85px"> </el-input>
        <span class="space-tips">-</span>
        <el-input v-model="ruleForm.bMaxMoney" placeholder="金额" maxlength="18" clearable style="width: 85px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="startMoney" label="操作后">
        <el-input v-model="ruleForm.cMinMoney" placeholder="操作后" maxlength="18" clearable style="width: 85px"> </el-input>
        <span class="space-tips">-</span>
        <el-input v-model="ruleForm.cMaxMoney" placeholder="操作后" maxlength="18" clearable style="width: 85px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="status" label="流水类型">
        <el-select v-model="ruleForm.status" placeholder="请选择" no-data-text="暂无数据" style="width: 200px">
          <el-option :value="item" :label="item" v-for="(item, index) in ruleForm.statusList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="85" label="创建时间">
        <el-date-picker v-model="ruleForm.rceTime" type="date" label="创建时间" placeholder="请选择" style="width: 200px" />
      </el-form-item>
      <!-- <el-form-item label-width="85" label="创建时间">
        <el-date-picker v-model="ruleForm.submitTime" type="date" label="创建时间" placeholder="请选择" style="width: 200px" />
      </el-form-item> -->
      <el-form-item label-width="85">
        <el-button class="custom-button-0" @click="submitForm(formInlineRef)">提交</el-button>
        <el-button @click="resetForm(formInlineRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="form-buttons-bar">
      <el-button class="custom-button-3">$红包金额：{{ obj.redPack }}元</el-button>
      <el-button class="custom-button-3">$充值金额：{{ obj.recharge }}元</el-button>
      <el-button class="custom-button-3">$手续费扣款：{{ obj.commission }}元</el-button>
      <el-button class="custom-button-3">$红包退回：{{ obj.redBack }}元</el-button>
    </div>
    <CommonTable :tableData="ruleForm.list" :tableCol="ruleForm.tableCol" @handleSelectionChange="handleSelectionChange">
      <template v-slot:dealType="slotProps">
        <span :class="`type-${slotProps.info.dealType}`">{{ getDealType(slotProps.info.dealType) }}</span>
      </template>
    </CommonTable>
    <Pagination :pageSize="ruleForm.pageSize" :pageTotal="ruleForm.total" @pageFunc="pageFunc"
      :currentPage="ruleForm.currentPage" @handleChange="handleChange"></Pagination>
  </div>
</template>
<script lang="ts" setup>
import api from '@/api';
import CommonTable from '@/components/CommonTable.vue';
import Pagination from '@/components/Pagination.vue';
import { statementMap } from '@/constant/object';
import { formatTime } from '@/utils/utils';
import { type FormInstance, type FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
const emits = defineEmits(['handleSubmit', 'handleReset']);
const formInlineRef = ref<FormInstance>();
const ruleForm = reactive<any>({
  comState: '',
  submitTime: '',
  aMaxMoney: '', //--> BeforeMoney
  aMinMoney: '',
  bMaxMoney: '', //--> ChangeMoney
  bMinMoney: '',
  cMaxMoney: '', //--> AfterMoney
  cMinMoney: '',
  rceTime: '',
  statusList: Object.values(statementMap),
  list: [] as any[],
  total: 0,
  pageNum: 1, //当前页,从第0页开始查
  pageSize: 10, //每页条目数
  currentPage: 1,
  tableCol: [
    {
      prop: 'id',
      label: 'ID',
      tooltip: true,
    },
    {
      prop: 'beforeMoney',
      label: '操作前',
      tooltip: true,
    },
    {
      prop: 'changeMoney',
      label: '金额',
      tooltip: true,
    },
    {
      prop: 'afterMoney',
      label: '操作后',
      tooltip: true,
    },
    {
      prop: 'dealType',
      label: '流水类型',
      tooltip: true,
      slot: 'dealType'
    },
    {
      prop: 'remark',
      label: '备注',
      tooltip: true,
    },
    {
      prop: 'creTime',
      label: '创建时间',
      tooltip: true,
    },
  ],
});
const obj = reactive<any>({
  selectedRows: <any>[],
  redPack: 0,
  redBack: 0,
  commission: 0,
  recharge: 0,
});
const rules = reactive<FormRules>({});
onMounted(() => {
  getData();
});
const getData = async () => {
  console.log('1', getStatus(ruleForm.status));
  const data = await api.queryTotalSelect({
    pages: ruleForm.pageNum,
    pageSize: ruleForm.pageSize,
    map: {
      comState: getStatus(ruleForm.status),
      rceTime: formatTime(ruleForm.rceTime),
      aMaxMoney: ruleForm.aMaxMoney,
      aMinMoney: ruleForm.aMinMoney,
      bMaxMoney: ruleForm.bMaxMoney,
      bMinMoney: ruleForm.bMinMoney,
      cMaxMoney: ruleForm.cMaxMoney,
      cMinMoney: ruleForm.cMinMoney,
    },
  });
  const { page, extra } = data;
  obj.redPack = extra.hongbao;
  obj.redBack = extra.tuihui;
  obj.commission = extra.shouxu;
  obj.recharge = extra.chongzhi;
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
  ruleForm.aMaxMoney = '';
  ruleForm.aMinMoney = '';
  ruleForm.bMaxMoney = '';
  ruleForm.bMinMoney = '';
  ruleForm.cMaxMoney = '';
  ruleForm.cMinMoney = '';
  getData();
  emits('handleReset', ruleForm);
};
const getStatus = (e: any) => {
  var status = '';
  if (e == statementMap['R']) {
    status = 'R';
  } else if (e == statementMap['C']) {
    status = 'C';
  } else if (e == statementMap['S']) {
    status = 'S';
  } else if (e == statementMap['B']) {
    status = 'B';
  } else {
    status = '';
  }
  return status;
};
const handleSelectionChange = (rows: any) => {
  obj.selectedRows = rows;
};
const getDealType = (e: any) => {
  let status = ''
  if (e == 'R') {
    status = statementMap['R'];
  } else if (e == 'C') {
    status = statementMap['C']
  } else if (e == 'S') {
    status = statementMap['S']
  } else if (e == 'B') {
    status = statementMap['B']
  } else {
    status = '未知'
  }
  return status;
}
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
</style>
