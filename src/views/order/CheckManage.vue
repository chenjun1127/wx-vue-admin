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
      <!-- <template v-if="userInfo.role == 1"> <el-button @click="toRecharge">$冲值金额</el-button></template> -->
      <div class="tips" @click="toConcat">有效期{{ obj.vipDay }}天</div>
      <el-button class="custom-button-4" @click="toSevenSubmit">7天内重复订单</el-button>
    </div>
    <CommonTable :tableData="ruleForm.list" :tableCol="ruleForm.tableCol" @handleSelectionChange="handleSelectionChange" isShowSelection>
      <template v-slot:wechatAvatar="slotProps">
        <el-popover placement="right" show-arrow width="240" popper-class="table-popover" trigger="hover">
          <template #reference>
            <div class="table-img-bg" :style="{ backgroundImage: 'url(' + slotProps.info.wechatAvatar + ')' }"></div>
          </template>
          <img :src="slotProps.info.wechatAvatar" class="table-img" style="max-width: 300px" />
        </el-popover>
      </template>
      <template v-slot:pictro="slotProps">
        <div>
          <div class="table-img-bg" :style="{ backgroundImage: 'url(' + slotProps.info.pictro + ')' }"> </div>
          <div class="look-pic" @click="toLook(slotProps.info.pictro)">查看图片</div>
        </div>
      </template>
      <template v-slot:comState="slotProps">
        <span :class="`type-${slotProps.info.comState}`">{{ getComStateString(slotProps.info.comState) }}</span>
      </template>
      <template v-slot:claimState="slotProps">
        <span :class="`status-${slotProps.info.claimState}`">{{ getClaimStateString(slotProps.info.claimState) }}</span>
      </template>
      <template v-slot:operate="slotProps">
        <div style="operate-buttons">
          <template v-if="slotProps.info.comState == 'P'">
            <el-button type="success" size="small" :icon="Select" @click="toCheck(slotProps.info)">审核</el-button>
            <el-button size="small" type="danger" :icon="CloseBold" @click="toRefuse(slotProps.info, 2)">拒绝</el-button>
            <el-button size="small" @click="toUpdate(slotProps.info, 3)">修改金额</el-button>
          </template>
          <template v-else>
            <el-button type="primary" size="small" @click="toDetail(slotProps.info, 0)">订单详情</el-button>
            <el-button size="small" @click="toRemark(slotProps.info, 1)">备注</el-button>
          </template>
        </div>
      </template>
    </CommonTable>
    <Pagination :pageSize="ruleForm.pageSize" :pageTotal="ruleForm.total" @pageFunc="pageFunc" :currentPage="ruleForm.currentPage" @handleChange="handleChange"></Pagination>
  </div>
  <Dialog :width="getWidth" :visible="ruleForm.showDetail" @handleClose="handleClose" :title="getTitle" :noFooter="true">
    <template #content>
      <OrderRemark v-if="currentIndex == 1" @handleClose="handleClose" @handleCancel="handleCancel" />
      <OrderDetail v-else-if="currentIndex == 0" :info="ruleForm.rowInfo"></OrderDetail>
      <OrderRefuse v-else-if="currentIndex == 2" :info="ruleForm.rowInfo" @handleClose="handleClose" @handleCancel="handleCancel"></OrderRefuse>
      <OrderMoney v-else-if="currentIndex == 3" :info="ruleForm.rowInfo" @handleClose="handleClose" @handleCancel="handleCancel"></OrderMoney>
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
  <Dialog width="700" :visible="obj.currentLookPicShow" @handleClose="handleClosePic" title="评价图片" :noFooter="true">
    <template #content>
      <div class="look-pic-content">
        <img :src="obj.currentLookPic" />
      </div>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import api from '@/api';
import CommonTable from '@/components/CommonTable.vue';
import Dialog from '@/components/Dialog.vue';
import Pagination from '@/components/Pagination.vue';
import { claimStateMap, comStateMap } from '@/constant/object';
import { userInfoStore } from '@/stores/userInfo';
import { formatTime } from '@/utils/utils';
import { CloseBold, Select } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
import { computed, onMounted, reactive, ref } from 'vue';
import OrderDetail from './OrderDetail.vue';
import OrderMoney from './OrderMoney.vue';
import OrderRefuse from './OrderRefuse.vue';
import OrderRemark from './OrderRemark.vue';
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
      tooltip: true,
    },
    {
      prop: 'wechatName',
      label: '微信昵称',
      tooltip: true,
    },
    {
      prop: 'wechatAvatar',
      label: '头像',
      slot: 'wechatAvatar',
      tooltip: false,
    },
    {
      prop: 'phone',
      label: '手机号码',
      tooltip: true,
    },
    {
      prop: 'pictro',
      label: '评价截图',
      slot: 'pictro',
      tooltip: false,
    },
    {
      prop: 'comState',
      label: '状态',
      slot: 'comState',
      tooltip: true,
    },
    {
      prop: 'comMoney',
      label: '审核金额',
      tooltip: true,
    },
    {
      prop: 'recTime',
      label: '提交时间',
      tooltip: true,
    },
    {
      prop: 'disTime',
      label: '处理时间',
      tooltip: true,
    },
    {
      prop: 'remark',
      label: '备注',
      tooltip: true,
    },
    {
      prop: 'claimState',
      label: '领取状态 ',
      slot: 'claimState',
      tooltip: true,
    },
    {
      prop: 'operate',
      label: '操作',
      slot: 'operate',
      width: 240,
      tooltip: true,
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
  currentLookPicShow: false,
  currentLookPic: '',
});
const getTitle = computed(() => {
  if (currentIndex.value == 0) {
    return '详情';
  } else if (currentIndex.value == 1) {
    return '备注';
  } else if (currentIndex.value == 2) {
    return '拒绝理由';
  } else {
    return '修改金额';
  }
});
const getWidth = computed(() => {
  if (currentIndex.value == 2) {
    return '580';
  } else if (currentIndex.value == 3) {
    return '400';
  } else {
    return '50%';
  }
});
const currentIndex = ref<number>(0);
const rules = reactive<FormRules>({});
onMounted(() => {
  console.log('userInfo==' + userInfo.role);
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
const userInfo = userInfoStore();
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
  return status;
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
const toCheck = (e: any) => {
  ElMessageBox.confirm('您确定通过审核?', '信息', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await api.batchUpdate({ ids: [e.id] });
      getData();
    })
    .catch(() => {});
};
const toRefuse = (e: any, index: number) => {
  currentIndex.value = index;
  ruleForm.showDetail = true;
  ruleForm.rowInfo = e;
};
const toUpdate = (e: any, index: number) => {
  currentIndex.value = index;
  ruleForm.showDetail = true;
  ruleForm.rowInfo = e;
};

const handleClose = (e: any) => {
  ruleForm.showDetail = false;
  if (currentIndex.value == 2) {
    api.batchUpdate({ ids: [ruleForm.rowInfo.id], type: 'DE', msg: e });
  } else if (currentIndex.value == 3) {
    api.updateMoney({ id: ruleForm.rowInfo.id, comState: ruleForm.rowInfo.comState, comMoney: e });
  }
  getData();
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
// const toRecharge = () => {
//   obj.type = 3;
//   obj.showConfirm = true;
// };
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
    await api.batchUpdate({ ids: list });
  } else if (obj.type == 1) {
    var list = obj.selectedRows.map((e: { id: any }) => e.id);
    await api.exportOrderInfo(list);
  } else if (obj.type == 3) {
    // var value: any = await api.moneyRecharge_2(obj.money);
    // //  console.log(value);
    // download(value);
  } else if (obj.type == 2) {
  }
};
// const download = async (url?: string) => {
//   const newWindow = window.open();
//   if (newWindow != null) {
//     newWindow.document.write(
//       `<html><body style='text-align:center;'><p style='text-align:center;font-size:18px;font-weight:bold'>微信支付</p><p>订单标题：余额充值</p><p>订单价格：<span style='color:red;'>${obj.money}</span>元</p><img src="${url}" /></body></html>`,
//     );
//   }
// };
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
const toLook = (url: string) => {
  console.log(url);
  obj.currentLookPic = url;
  obj.currentLookPicShow = true;
};
const handleClosePic = () => {
  obj.currentLookPicShow = false;
};
</script>

<style lang="scss">
.space-tips {
  display: inline-block;
  width: 30px;
  color: #333;
  text-align: center;
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

.look-pic {
  cursor: pointer;
  padding: 8px 0;
  font-size: 12px;
  display: block;
}

.look-pic-content {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    display: block;
    overflow: hidden;
  }
}
</style>
