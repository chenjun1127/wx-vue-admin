<template>
  <div class="inner">
    <el-form :inline="true" :model="ruleForm" ref="formInlineRef" class="common-form-inline" :rules="rules">
      <el-form-item label-width="85" prop="nickName" label="微信昵称">
        <el-input v-model="ruleForm.nickName" placeholder="微信昵称" maxlength="18" clearable style="width: 200px">
        </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="phone" label="手机号码">
        <el-input v-model="ruleForm.phone" placeholder="手机号码" maxlength="18" clearable style="width: 200px"> </el-input>
      </el-form-item>

      <el-form-item label-width="85">
        <el-button class="custom-button-0" @click="submitForm(formInlineRef)">提交</el-button>
        <el-button @click="resetForm(formInlineRef)">重置</el-button>
        <el-button class="custom-button-2" @click="addUser">添加</el-button>
      </el-form-item>
    </el-form>

    <CommonTable :tableData="ruleForm.list" :tableCol="ruleForm.tableCol" @handleSelectionChange="handleSelectionChange">
      <template v-slot:type="slotProps">
        <span :class="`type-${slotProps.info.type}`">{{ getUserType(slotProps.info.type) }}</span>
      </template>
      <template v-slot:operate="slotProps">
        <div class="operate-buttons">
          <el-button type="warning" size="small" v-if="slotProps.info.type == 'P'"
            @click="toRecharge(slotProps.info, 3)">充值</el-button>
          <el-button type="primary" size="small" @click="toEdit(slotProps.info, 0)">编辑</el-button>
          <el-button type="danger" size="small" @click="toDel(slotProps.info, 1)">删除</el-button>
          <el-button type="success" size="small" @click="toReset(slotProps.info, 2)">重置密码</el-button>
        </div>
      </template>
      <template v-slot:wxCode="slotProps">
        <div class="code">
          <el-popover placement="right" show-arrow width="240" popper-class="table-popover" trigger="click">
            <template #reference>
              <div class="table-img-bg" :style="{ backgroundImage: 'url(' + slotProps.info.wxCode + ')' }"></div>
            </template>
            <img :src="slotProps.info.wxCode" class="table-img" />
          </el-popover>
          <el-button class="download-button" size="small" @click="download(slotProps.info.wxCode)">下载</el-button>
        </div>
      </template>
    </CommonTable>
    <Pagination :pageSize="ruleForm.pageSize" :pageTotal="ruleForm.total" @pageFunc="pageFunc"
      :currentPage="ruleForm.currentPage" @handleChange="handleChange"></Pagination>
  </div>
  <Dialog :visible="ruleForm.showDetail" :title="obj.type == 0 ? '添加用户' : '编辑用户'" @handleClose="handleCloseDialog"
    :noFooter="true">
    <template #content>
      <AddUser @handleClose="handleClose" @handleCancel="handleCancel" :info="obj.currentInfo"></AddUser>
    </template>
  </Dialog>
  <el-dialog v-model="obj.showConfirm" title="充值金额" width="30%" :before-close="handleCloseConfirm">
    <div class="el-cont">
      <el-input v-model="obj.money"></el-input>
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
import { userType } from '@/constant/object';
import { ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import AddUser from './AddUser.vue';
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
      tooltip: true,
    },
    {
      prop: 'name',
      label: '用户名',
      tooltip: true,
    },
    {
      prop: 'password',
      label: '密码',
      tooltip: true,
    },
    {
      prop: 'type',
      label: '类型',
      slot: 'type',
      tooltip: true,
    },
    {
      prop: 'phone',
      label: '手机号码',
      tooltip: true,
    },
    {
      prop: 'email',
      label: '邮箱',
      tooltip: true,
    },
    {
      prop: 'createTime',
      label: '创建时间',
      tooltip: true,
    },
    {
      prop: 'wxCode',
      label: '二维码',
      slot: 'wxCode',
      tooltip: true,
    },
    {
      prop: 'operate',
      label: '操作',
      slot: 'operate',
      width: 270,
      tooltip: true,
    },
  ],
  showDetail: false,
});
const obj = reactive<any>({
  selectedRows: <any>[],
  currentInfo: {},
  type: 0, //0添加，1，编辑
  showConfirm: false,
  money: '',
  currentRow: {},
});
const rules = reactive<FormRules>({});
onMounted(() => {
  getData();
});
const getData = async () => {
  const data = await api.queryMerchant({
    pages: ruleForm.pageNum,
    pageSize: ruleForm.pageSize,
    map: {
      wechatName: ruleForm.nickName,
      phone: ruleForm.phone,
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
const getUserType = (e: any) => {
  if (e == 'A') {
    return userType['A'];
  } else if (e == 'P') {
    return userType['P'];
  } else {
    return '未知';
  }
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  getData();
  emits('handleReset', ruleForm);
};
const handleCancel = () => {
  ruleForm.showDetail = false;
};
const handleSelectionChange = (rows: any) => {
  obj.selectedRows = rows;
};
const addUser = () => {
  ruleForm.showDetail = true;
  obj.currentInfo = {};
  obj.type = 0;
};
const getTypeString = (e: string) => {
  if (e == userType['A']) {
    return 'A';
  } else if (e == userType['P']) {
    return 'P';
  } else {
    return '';
  }
};
const handleClose = async (info: any) => {
  console.log(1111, info);
  var params = {
    name: info.name,
    petName: info.petName,
    password: info.password,
    type: getTypeString(info.role),
    phone: info.phone,
    balance: info.balance,
    redType: info.redType,
  };
  var vipMap = {} as any;
  if (info.vip == '1') {
    vipMap.vip = 'P';
    vipMap.vipDay = info.vipDay;
  } else {
    vipMap.vip = 'F';
  }

  ruleForm.showDetail = false;
  var map = {} as any;
  if (obj.type == 1) {
    map['id'] = obj.currentInfo.id;
  }
  await api.addUser({ ...params, ...map, ...vipMap });
  getData();
};
const handleCloseDialog = () => {
  ruleForm.showDetail = false;
};
const toEdit = (info: any, _index: number) => {
  obj.type = 1;
  ruleForm.showDetail = true;
  obj.currentInfo = info;
};
const toDel = (info: any, _index: number) => {
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await api.userDel(info.id);
      getData();
    })
    .catch(() => { });
};
const toReset = (info: any, _index: number) => {
  ElMessageBox.confirm('确定要重置密码吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await api.resetUser(info.id);
      getData();
    })
    .catch(() => { });
};
const toRecharge = (info: any, _index: number) => {
  console.log(info);
  obj.currentRow = info;
  obj.showConfirm = true;
};

const download = async (url?: string) => {
  const newWindow = window.open();
  if (newWindow != null) {
    newWindow.document.write(`<html><body style='text-align:center;'><img src="${url}" /><p>请右键点击图片-另存为</p></body></html>`);
  }
};
const handleCloseConfirm = async () => {
  obj.showConfirm = false;
};
const handleTypeConfirm = async () => {
  obj.showConfirm = false;

  await api.moneyRecharge(obj.money, obj.currentRow.id);
  obj.money = '';
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

.code {
  display: flex;
  align-items: center;
  flex-direction: row;

  .download-button {
    margin-left: 10px;
  }
}

.operate-buttons {
  display: flex;
  justify-content: flex-end;
}</style>
