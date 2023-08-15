<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
    <el-form-item label="用户名" label-width="120" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="密码" label-width="120" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>

    <el-form-item label="角色" label-width="120">
      <el-input v-model="ruleForm.petName" />
    </el-form-item>
    <el-form-item label-width="120" label="角色类型" prop="role">
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

    <el-form-item label="vip天数" label-width="120" v-if="ruleForm.vip == '1'">
      <el-input v-model="ruleForm.vipDay" />
    </el-form-item>
    <el-form-item label-width="120">
      <el-button class="custom-button-0" @click="submitForm(ruleFormRef)">添加</el-button>
      <el-button @click="resetForm(ruleFormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { userType } from '@/constant/object';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
const ruleFormRef = ref<FormInstance>();
const emits = defineEmits(['handleClose', 'handleCancel']);
const ruleForm = reactive({
  name: '',
  password: '',
  petName: '',
  vip: '0',
  vipDay: '10',
  type: '',
  roleList: Object.values(userType),
  role: '',
});
const props = defineProps({
  info: {} as any,
});
onMounted(() => {
  console.log(props.info);
});
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 10, message: '用户名3到10个字符', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'change',
    },
  ],
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
      console.log('submit!' + ruleForm.name);
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
