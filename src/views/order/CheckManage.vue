<template>
  <div class="check-container">
    <el-form :inline="true" :model="ruleForm" ref="formInlineRef" class="common-form-inline" :rules="rules">
      <el-form-item label-width="85" prop="merchantName" label="商户名称">
        <el-input v-model="ruleForm.merchantName" placeholder="商户名称" maxlength="18" clearable style="width: 200px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="merchantLocation" label="商户位置">
        <el-input v-model="ruleForm.merchantLocation" placeholder="商户位置" maxlength="18" clearable style="width: 200px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="nickName" label="微信昵称">
        <el-input v-model="ruleForm.nickName" placeholder="微信昵称" maxlength="18" clearable style="width: 200px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="phone" label="手机号码">
        <el-input v-model="ruleForm.phone" placeholder="手机号码" maxlength="18" clearable style="width: 200px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="status" label="审核状态">
        <el-select v-model="ruleForm.status" placeholder="请选择" no-data-text="暂无数据" style="width: 200px">
          <el-option :value="item" :label="item" v-for="(item, index) in ruleForm.statusList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="85" prop="startMoney" label="审核金额">
        <el-input v-model="ruleForm.startMoney" placeholder="审核金额" maxlength="18" clearable style="width: 85px"> </el-input>
        <span class="space-tips">-</span>
        <el-input v-model="ruleForm.endMoney" placeholder="审核金额" maxlength="18" clearable style="width: 85px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" label="提交时间">
        <el-date-picker v-model="ruleForm.submitTime" type="date" label="提交时间" placeholder="请选择" style="width: 200px" />
      </el-form-item>
      <el-form-item label-width="85" label="处理时间">
        <el-date-picker v-model="ruleForm.handleTime" type="date" label="处理时间" placeholder="请选择" style="width: 200px" />
      </el-form-item>
      <el-form-item label-width="85" prop="receiveStatus" label="领取状态">
        <el-select v-model="ruleForm.receiveStatus" placeholder="请选择" no-data-text="暂无数据" style="width: 200px">
          <el-option :value="item" :label="item" v-for="(item, index) in ruleForm.receiveStatusList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="85">
        <el-button class="custom-button-0" @click="submitForm(formInlineRef)">提交</el-button>
        <el-button @click="resetForm(formInlineRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="form-buttons-bar">
      <el-button class="custom-button-1" color="red" @click="submitForm(formInlineRef)">批量审核</el-button>
      <el-button class="custom-button-2" @click="submitForm(formInlineRef)">导出</el-button>
      <el-button class="custom-button-3" @click="submitForm(formInlineRef)">$余额8.5元</el-button>
      <el-button @click="submitForm(formInlineRef)">$冲值金额</el-button>
      <div class="tips">有效期183天</div>
      <el-button class="custom-button-4" @click="submitForm(formInlineRef)">7天内重复订单</el-button>
    </div> -->
    <CommonTable :tableData="ruleForm.list" :tableCol="ruleForm.tableCol">
      <template v-slot:wechatAvatar="slotProps">
        <el-popover placement="right" show-arrow width="300" popper-class="table-popover" trigger="hover">
          <template #reference>
            <div class="table-img-bg" :style="{ backgroundImage: 'url(' + slotProps.info.wechatAvatar + ')' }"></div>
          </template>
          <img :src="slotProps.info.wechatAvatar" class="table-img" style="max-width: 300px" />
        </el-popover>
      </template>
      <template v-slot:pictro="slotProps">
        <el-popover placement="right" show-arrow width="300" popper-class="table-popover" trigger="hover">
          <template #reference>
            <div class="table-img-bg" :style="{ backgroundImage: 'url(' + slotProps.info.pictro + ')' }"></div>
          </template>
          <img :src="slotProps.info.pictro" class="table-img" style="max-width: 300px" />
        </el-popover>
      </template>
      <template v-slot:comState="slotProps">
        <span :class="`type-${slotProps.info.comState}`">{{ getComStateString(slotProps.info.comState) }}</span>
      </template>
      <template v-slot:claimState="slotProps">
        <span :class="`status-${slotProps.info.claimState}`">{{ getClaimStateString(slotProps.info.claimState) }}</span>
      </template>
    </CommonTable>
    <Pagination :pageSize="ruleForm.pageSize" :pageTotal="ruleForm.total" @pageFunc="pageFunc" :currentPage="ruleForm.currentPage" @handleChange="handleChange"></Pagination>
  </div>
</template>
<script lang="ts" setup>
import api from '@/api';
import CommonTable from '@/components/CommonTable.vue';
import Pagination from '@/components/Pagination.vue';
import { claimStateMap, comStateMap } from '@/constant/object';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
const emits = defineEmits(['handleSubmit', 'handleReset']);
const formInlineRef = ref<FormInstance>();
const ruleForm = reactive<any>({
  statusList: ['待审核', '已审核', '已拒绝'],
  receiveStatusList: ['未发放', '已领取', '已过期', '已发放'],
  merchantName: '',
  merchantLocation: '',
  phone: '',
  nickName: '',
  status: '',
  receiveStatus: '',
  startMoney: '',
  endMoney: '',
  submitTime: '',
  handleTime: '',
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
      prop: 'pictro',
      label: '评价截图',
      slot: 'pictro',
    },
    {
      prop: 'comState',
      label: '状态',
      slot: 'comState',
    },
    {
      prop: 'comMoney',
      label: '审核金额',
    },
    {
      prop: 'recTime',
      label: '提交时间',
    },
    {
      prop: 'disTime',
      label: '处理时间',
    },
    {
      prop: 'remark',
      label: '备注',
    },
    {
      prop: 'claimState',
      label: '领取状态 ',
      slot: 'claimState',
    },
    {
      prop: 'operate',
      label: '操作',
    },
  ],
});
const rules = reactive<FormRules>({});
onMounted(() => {
  getData();
});
const getData = async () => {
  const data = await api.getOrder({
    pages: ruleForm.pageNum,
    pageSize: ruleForm.pageSize,
    map: {
      comName: ruleForm.merchantName,
      comLocation: ruleForm.merchantLocation,
      wechatName: ruleForm.nickName,
      phone: ruleForm.phone,
      maxMoney: ruleForm.endMoney,
      minMoney: ruleForm.startMoney,
      comState: getStatus(ruleForm.status),
      rceTime: ruleForm.submitTime,
      disTime: ruleForm.handleTime,
      claimState: getReceiveStatus(ruleForm.receiveStatus),
      sevenDay: '',
    },
  });
  const { page } = data;
  console.log(data);
  ruleForm.list = page.records;
  ruleForm.total = page.total;
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm);
      emits('handleSubmit', ruleForm);
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();

  emits('handleReset', ruleForm);
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
const getComStateString = (e: any) => {
  if (!e) return '';
  return (comStateMap as any)[e];
};
const getClaimStateString = (e: any) => {
  if (!e) return '';
  return (claimStateMap as any)[e];
};
const getReceiveStatus = (e: any): string => {
  var status = '';
  if (e == '未发放') {
    status == 'NS';
  } else if (e == '已领取') {
    status == 'OK';
  } else if (e == '已过期') {
    status == 'TO';
  } else if (e == '已发放') {
    status == 'SS';
  } else {
    status == '';
  }
  return status;
};
const getStatus = (e: any) => {
  var status = '';
  if (e == '已审核') {
    status == 'Y';
  } else if (e == '待审核') {
    status == 'P';
  } else if (e == '已拒绝') {
    status == 'N';
  } else {
    status == '';
  }
  return getStatus;
};
</script>

<style lang="scss">
.space-tips {
  display: inline-block;
  width: 30px;
  color: #333;
  text-align: center;
}
.table-img-bg {
  width: 60px;
  height: 60px;
  background-size: contain;
}
.type-Y {
  color: green;
}
.type-P {
  color: #f90;
}
.type-N {
  color: #f00;
}
.status-NS {
  color: #333;
}
.status-OK {
  color: green;
}
.status-TO {
  color: rgb(230, 115, 22);
}
.status-SS {
  color: rgb(9, 196, 213);
}
</style>
