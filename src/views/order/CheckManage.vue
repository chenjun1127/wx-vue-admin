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
    <div class="form-buttons-bar">
      <el-button class="custom-button-1" color="red" @click="allCheck">批量审核</el-button>
      <el-button class="custom-button-2" @click="exportFile">导出</el-button>
      <el-button class="custom-button-3" @click="updateMoney">$余额{{ obj.balance }}元</el-button>
      <el-button @click="toRecharge">$冲值金额</el-button>
      <div class="tips" @click="toConcat">有效期{{ obj.vipDay }}天</div>
      <el-button class="custom-button-4" @click="toSevenSubmit">7天内重复订单</el-button>
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
      <template v-slot:operate="slotProps">
        <div style="operate-buttons">
          <el-button type="primary" size="small" @click="toDetail(slotProps.info, 0)">订单详情</el-button>
          <el-button size="small" @click="toRemark(slotProps.info, 1)">备注</el-button>
        </div>
      </template>
    </CommonTable>
    <Pagination :pageSize="ruleForm.pageSize" :pageTotal="ruleForm.total" @pageFunc="pageFunc" :currentPage="ruleForm.currentPage" @handleChange="handleChange"></Pagination>
  </div>
  <Dialog :visible="ruleForm.showDetail" @handleClose="handleClose" :title="currentIndex == 0 ? '详情' : '备注'" :noFooter="true">
    <template v-if="currentIndex == 1" #content>
      <OrderRemark @handleClose="handleClose" @handleCancel="handleCancel" />
    </template>
    <template #content>
      <OrderDetail :info="ruleForm.rowInfo"></OrderDetail>
    </template>
  </Dialog>
  <el-dialog v-model="obj.showConfirm" :title="getTips(obj.type)" width="30%" :before-close="handleCloseConfirm">
    <div class="el-cont">
      <template v-if="obj.type == 0">
        <p>确定审核选中的 {{ obj.selectedRows.length }} 项? 有 0 项重复提交！</p>
      </template>
      <template v-else-if="obj.type == 1">
        <p> 确定导出选中的 {{ obj.selectedRows.length }} 项? 有 0 项重复提交！ </p>
      </template>
      <template v-else-if="obj.type == 3">
        <el-input v-model="obj.money"></el-input>
      </template>
      <template v-else>
        <p>经理电话：1548758475</p>
      </template>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="obj.showConfirm = false">取消</el-button>
        <el-button type="primary" @click="handleTypeConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import api from '@/api';
import CommonTable from '@/components/CommonTable.vue';
import Dialog from '@/components/Dialog.vue';
import Pagination from '@/components/Pagination.vue';
import { claimStateMap, comStateMap } from '@/constant/object';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import OrderDetail from './OrderDetail.vue';
import OrderRemark from './OrderRemark.vue';
import { formatTime } from '@/utils/utils';
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
  sevenDay: '',
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
      slot: 'operate',
      width: 200,
    },
  ],
  showDetail: false,
  rowInfo: {},
});
const obj = reactive<any>({
  vipDay: 0,
  balance: 0,
  selectedRows: <any>[],
  showConfirm: false,
  type: 0, //0审核,1导出,2余额显示，3充值金额,4有效期,
  money: 0,
});
const currentIndex = ref<number>(0);
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
      rceTime: formatTime(ruleForm.submitTime),
      disTime: formatTime(ruleForm.handleTime),
      claimState: getReceiveStatus(ruleForm.receiveStatus),
      sevenDay: ruleForm.sevenDay,
    },
  });
  const { page, extra } = data;
  obj.vipDay = extra.vipDay;
  obj.balance = extra.balance;
  ruleForm.list = page.records;
  ruleForm.total = page.total;
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm);
      emits('handleSubmit', ruleForm);
      getData();
    } else {
      console.log('error submit!', fields);
    }
  });
};
const toSevenSubmit = () => {
  ruleForm.sevenDay = 'sevenDay';
  getData();
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  ruleForm.sevenDay = '';
  getData();
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
    status = 'NS';
  } else if (e == '已领取') {
    status = 'OK';
  } else if (e == '已过期') {
    status = 'TO';
  } else if (e == '已发放') {
    status = 'SS';
  } else {
    status = '';
  }
  return status;
};
const getStatus = (e: any) => {
  var status = '';
  if (e == '已审核') {
    status = 'Y';
  } else if (e == '待审核') {
    status = 'P';
  } else if (e == '已拒绝') {
    status = 'N';
  } else {
    status = '';
  }
  return getStatus;
};
const toDetail = (e: any, index: number) => {
  currentIndex.value = index;
  ruleForm.showDetail = true;
  ruleForm.rowInfo = e;
};
const toRemark = (_e: any, index: number) => {
  currentIndex.value = index;
  ruleForm.showDetail = true;
};
const handleClose = () => {
  ruleForm.showDetail = false;
};
const handleCancel = () => {
  ruleForm.showDetail = false;
};
const allCheck = () => {
  obj.type = 0;
  if (!obj.selectedRows.length) {
    ElMessage({
      message: '请选择要审核的订单',
      type: 'error',
      duration: 1500,
    });
    return;
  }
  obj.showConfirm = true;
};
const toRecharge = () => {
  obj.type = 3;
  obj.showConfirm = true;
};
const exportFile = () => {
  obj.type = 1;
  if (!obj.selectedRows.length) {
    ElMessage({
      message: '请选择要导出的订单',
      type: 'error',
      duration: 1500,
    });
    return;
  }
  obj.showConfirm = true;
};
const toConcat = () => {
  obj.type = 4;
  obj.showConfirm = true;
};
const updateMoney = async () => {
  obj.type = 2;
};
const handleSelectionChange = (rows: any) => {
  obj.selectedRows = rows;
};
const handleCloseConfirm = async () => {
  obj.showConfirm = false;
};
const handleTypeConfirm = async () => {
  obj.showConfirm = false;
  if (obj.type == 0) {
    var list = obj.selectedRows.map((e: { id: any }) => e.id);
    await api.batchUpdate(list);
  } else if (obj.type == 1) {
    var list = obj.selectedRows.map((e: { id: any }) => e.id);
    await api.exportOrderInfo(list);
  } else if (obj.type == 3) {
    await api.moneyRecharge(obj.money);
  } else if (obj.type == 2) {
  }
};
const getTips = (type: number) => {
  if (type == 0) {
    return '批量审核';
  } else if (type == 1) {
    return '导出';
  } else if (type == 2) {
    return '充值金额';
  } else {
    return '联系经理';
  }
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

.operate-buttons {
  display: flex;
  justify-content: end;
}

.form-buttons-bar {
  margin-bottom: 15px;
}

.tips {
  cursor: pointer;
}
</style>
