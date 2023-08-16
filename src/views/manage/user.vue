<template>
  <div class="inner">
    <el-form :inline="true" :model="ruleForm" ref="formInlineRef" class="common-form-inline" :rules="rules">
      <el-form-item label-width="85" prop="nickName" label="微信昵称">
        <el-input v-model="ruleForm.nickName" placeholder="微信昵称" maxlength="18" clearable style="width: 200px"> </el-input>
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
        <div style="operate-buttons">
          <el-button type="primary" size="small" @click="toEdit(slotProps.info, 0)">编辑</el-button>
          <el-button type="danger" size="small" @click="toDel(slotProps.info, 1)">删除</el-button>
          <el-button type="success" size="small" @click="toReset(slotProps.info, 2)">重置密码</el-button>
        </div>
      </template>
    </CommonTable>
    <Pagination :pageSize="ruleForm.pageSize" :pageTotal="ruleForm.total" @pageFunc="pageFunc" :currentPage="ruleForm.currentPage" @handleChange="handleChange"></Pagination>
  </div>
  <Dialog :visible="ruleForm.showDetail" :title="obj.type == 0 ? '添加用户' : '编辑用户'" @handleClose="handleCloseDialog" :noFooter="true">
    <template #content>
      <AddUser @handleClose="handleClose" @handleCancel="handleCancel" :info="obj.currentInfo"></AddUser>
    </template>
  </Dialog>
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
    },
    {
      prop: 'name',
      label: '用户名',
    },
    {
      prop: 'password',
      label: '密码',
    },
    {
      prop: 'type',
      label: '类型',
      slot: 'type',
    },
    {
      prop: 'phone',
      label: '手机号码',
    },
    {
      prop: 'email',
      label: '邮箱',
    },
    {
      prop: 'createTime',
      label: '创建时间',
    },
    {
      prop: 'updateTime',
      label: '更新时间',
    },
    {
      prop: 'operate',
      label: '操作',
      slot: 'operate',
      width: 200,
    },
  ],
  showDetail: false,
});
const obj = reactive<any>({
  selectedRows: <any>[],
  currentInfo: {},
  type: 0, //0添加，1，编辑
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
    redType:info.redType,
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
    .catch(() => {});
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
    .catch(() => {});
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
