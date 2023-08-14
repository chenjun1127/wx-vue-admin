<template>
  <main class="inner">
    <el-form :inline="true" :model="ruleForm" ref="formInlineRef" class="common-form-inline" :rules="rules">
      <el-form-item label-width="85" prop="nickName" label="微信昵称">
        <el-input v-model="ruleForm.nickName" placeholder="微信昵称" maxlength="18" clearable style="width: 200px">
        </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="phone" label="手机号码">
        <el-input v-model="ruleForm.phone" placeholder="手机号码" maxlength="18" clearable style="width: 200px"> </el-input>
      </el-form-item>

      <el-form-item label-width="85" prop="startMoney" label="审核金额">
        <el-input v-model="ruleForm.startMoney" placeholder="审核金额" maxlength="18" clearable style="width: 85px">
        </el-input>
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

import api from '@/api';
import CommonTable from '@/components/CommonTable.vue';
import Pagination from '@/components/Pagination.vue';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
const emits = defineEmits(['handleSubmit', 'handleReset']);
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
