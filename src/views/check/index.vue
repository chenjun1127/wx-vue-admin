<template>
  <div class="inner">
    <div class="check-container">
      <el-form :inline="true" :model="ruleForm" ref="formInlineRef" class="common-form-inline" :rules="rules">
        <el-form-item label-width="85" prop="nickName" label="微信昵称">
          <el-input v-model="ruleForm.nickName" placeholder="微信昵称" maxlength="18" clearable style="width: 200px"> </el-input>
        </el-form-item>
        <el-form-item label-width="85" prop="phone" label="手机号码">
          <el-input v-model="ruleForm.phone" placeholder="手机号码" maxlength="18" clearable style="width: 200px"> </el-input>
        </el-form-item>

        <el-form-item label-width="85" prop="startMoney" label="审核金额">
          <el-input v-model="ruleForm.startMoney" placeholder="审核金额" maxlength="18" clearable style="width: 85px"> </el-input>
          <span class="space-tips">-</span>
          <el-input v-model="ruleForm.endMoney" placeholder="审核金额" maxlength="18" clearable style="width: 85px"> </el-input>
        </el-form-item>
        <el-form-item label-width="85" label="提交时间">
          <el-date-picker v-model="ruleForm.submitTime" type="date" label="提交时间" placeholder="请选择" style="width: 200px" />
        </el-form-item>
        <el-form-item label-width="85">
          <el-button class="custom-button-0" @click="submitForm(formInlineRef)">提交</el-button>
          <el-button @click="resetForm(formInlineRef)">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="form-buttons-bar">
        <el-button class="custom-button-3" @click="submitForm(formInlineRef)">$余额8.5元</el-button>
        <el-button class="custom-button-3">$余额{{ obj.balance }}元</el-button>
      </div>
      <CommonTable :tableData="ruleForm.list" :tableCol="ruleForm.tableCol" @handleSelectionChange="handleSelectionChange">
        <template v-slot:wechatAvatar="slotProps">
          <el-popover placement="right" show-arrow width="300" popper-class="table-popover" trigger="hover">
            <template #reference>
              <div class="table-img-bg" :style="{ backgroundImage: 'url(' + slotProps.info.wechatAvatar + ')' }"></div>
            </template>
            <img :src="slotProps.info.wechatAvatar" class="table-img" style="max-width: 300px" />
          </el-popover>
        </template>
      </CommonTable>
      <Pagination :pageSize="ruleForm.pageSize" :pageTotal="ruleForm.total" @pageFunc="pageFunc" :currentPage="ruleForm.currentPage" @handleChange="handleChange"></Pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
import api from '@/api';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
const emits = defineEmits(['handleSubmit', 'handleReset']);
import CommonTable from '@/components/CommonTable.vue';
import Pagination from '@/components/Pagination.vue';
const formInlineRef = ref<FormInstance>();
const ruleForm = reactive<any>({
  phone: '',
  nickName: '',
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
      prop: 'wechatName',
      label: '微信昵称',
    },
    {
      prop: 'wechatAvatar',
      label: '头像',
      slot: 'wechatAvatar',
    },
    {
      prop: 'phone',
      label: '手机号码',
    },
    {
      prop: 'comMoney',
      label: '红包金额',
    },
    {
      prop: 'disTime',
      label: '发送时间',
    },
  ],
});
const obj = reactive<any>({
  selectedRows: <any>[],
});
const rules = reactive<FormRules>({});
onMounted(() => {
  getData();
});
const getData = async () => {
  const data = await api.queryRedPacket({
    pages: ruleForm.pageNum,
    pageSize: ruleForm.pageSize,
    map: {
      wechatName: ruleForm.nickName,
      phone: ruleForm.phone,
      maxMoney: ruleForm.endMoney,
      minMoney: ruleForm.startMoney,
      disTime: ruleForm.submitTime,
    },
  });
  const { page, extra } = data;
  obj.vipDay = extra.vipDay;
  obj.balance = extra.balance;
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
