<template>
  <div class="form-content">
    <div class="form-content-img">
      <div><img src="../../assets/images/avatar.png" alt="" /></div>
      <h1>13480653254</h1>
    </div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" disabled />
      </el-form-item>
      <el-form-item label="E-mail" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="ruleForm.nickName" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button color="#18bc9c" class="custom-button" @click="submitForm(ruleFormRef)"> 提交 </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
interface RuleForm {
  name: string;
  email: string;
  nickName: string;
  password: string;
}

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  email: '',
  nickName: '',
  password: '',
});

const rules = reactive<FormRules<RuleForm>>({
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱',
      trigger: ['blur', 'change'],
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style scoped>
.form-content {
  padding: 50px;
}

.form-content-img {
  height: 150px;
  margin-bottom: 20px;
}

.form-content-img > div {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50%;
  margin: 0 auto;
}

.form-content-img h1 {
  font-size: 18px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}

.form-content-img img {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 50%;
  z-index: 1;
  border: 5px solid #fff;
  margin: 0 auto;
}
</style>
