<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
    <el-form-item label="用户名" label-width="120" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="密码" label-width="120" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>
    <el-form-item label="手机号码" label-width="120" prop="phone">
      <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" />
    </el-form-item>
    <el-form-item label="角色" label-width="120" prop="petName">
      <el-input v-model="ruleForm.petName" placeholder="请输入角色名称，例如（经理）" />
    </el-form-item>
    <el-form-item label-width="120" label="角色类型">
      <el-select v-model="ruleForm.role" placeholder="请选择" no-data-text="暂无数据" style="width: 200px">
        <el-option :value="item" :label="item" v-for="(item, index) in ruleForm.roleList" :key="index"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label-width="120" label="是否VIP用户">
      <el-radio-group v-model="ruleForm.vip" class="custom-radio">
        <el-radio label="1">是</el-radio>
        <el-radio label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label-width="120" label="红包类型">
      <el-radio-group v-model="ruleForm.redType" class="custom-radio">
        <el-radio label="FN">固定</el-radio>
        <el-radio label="SJ">随机</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="vip天数" label-width="120" v-if="ruleForm.vip == '1'">
      <el-input v-model="ruleForm.vipDay" />
    </el-form-item>
    <el-form-item label="红包金额" label-width="120">
      <el-input v-model="ruleForm.balance" />
    </el-form-item>
    <el-form-item label-width="120">
      <el-button class="custom-button-0" @click="submitForm(ruleFormRef)">确定</el-button>
      <el-button @click="resetForm(ruleFormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { userType } from '@/constant/object';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref, watch } from 'vue';
const ruleFormRef = ref<FormInstance>();
const emits = defineEmits(['handleClose', 'handleCancel']);
const ruleForm = reactive({
  name: '',
  password: '',
  petName: '',
  vip: '1',
  vipDay: '',
  type: '',
  roleList: Object.values(userType),
  role: '',
  phone: '',
  balance: '',
  redType: 'FN', //FN固定，SJ随机
});
const props = defineProps({
  info: {} as any,
});
onMounted(() => {
  setData(props.info);
});
var setData = (info: any) => {
  console.log(info);
  const { name, petName, phone, vipDay, password, redType } = info;
  ruleForm.name = name;
  ruleForm.password = password;
  ruleForm.petName = petName;
  ruleForm.phone = phone;
  ruleForm.vipDay = vipDay;
  ruleForm.role = info.type == 'A' ? Object.values(userType)[0] : Object.values(userType)[1];
  ruleForm.redType = redType;
};
var checkPhone = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('手机号不能为空'));
  } else {
    //验证手机号
    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
    //验证区号
    const phoneReg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
    if (reg.test(value) || phoneReg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的联系电话'));
    }
  }
};
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 10, message: '用户名3到10个字符', trigger: 'blur' },
  ],
  phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'change',
    },
  ],
  petName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  date: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('handleClose', ruleForm);
    } else {
      console.log('error submit!', fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emits('handleCancel');
};
watch(
  () => props.info,
  (newInfo) => {
    setData(newInfo);
  },
  { deep: true },
);
</script>
<style scoped>
.order-pic {
  width: 120px;
  height: 180px;
  border: 1px solid #b5b5b5;
  padding: 2px;
  border-radius: 3px;
  display: block;
  overflow: hidden;
}
</style>
