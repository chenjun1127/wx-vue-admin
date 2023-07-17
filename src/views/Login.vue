<template>
  <div class="login">
    <div class="logo-bg-img" :style="{ backgroundImage: `url(${logoBg})` }">
      <img src="../assets/images/avatar.png" alt="" />
    </div>
    <div class="login-form">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" type="password" :prefix-icon="Lock" />
        </el-form-item>
        <!-- <div v-if="verifyShow" class="verify-show">
          <slide-verify :w="370"></slide-verify>
        </div> -->
        <div style="display: flex;">
          <el-form-item prop="validateCode">
            <el-input v-model="ruleForm.validateCode" />
          </el-form-item>
          <SlideVerify ref="refresh" @getCode="getCode" width="150px" :height="40" />
        </div>
        <el-form-item>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="submitForm(ruleFormRef)"> 登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import logoBg from '@/assets/images/login-head.png';
import { Lock, User } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import SlideVerify from '../components/ValidateCode.vue';
const verifyShow = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: '',
  password: '',
  validateCode: ""
});
const checkCode = (_rule: any, value: any, callback: any) => {
  console.log(code.value);
  if (!value) {
    return callback(new Error('请输入验证码'))
  }
  setTimeout(() => {
    if (value != code.value) {
      callback(new Error('验证码有误，请重新输入'))
    } else {
      callback()
    }
  }, 500)
}
const rules = reactive<FormRules<typeof ruleForm>>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  validateCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: checkCode, trigger: 'blur' },
  ]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  verifyShow.value = true;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};
const code = ref('')
const getCode = (value: any) => {
  code.value = value
  console.log(value);
}
// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.resetFields();
// };
 
</script>

<style scoped lang="scss">
.login {
  width: 430px;
  height: 600px;
  background-color: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  top: 50%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);

  .logo-img {
    width: 150px;
    height: 160px;
    margin-top: 75px;
  }

  .logo-bg-img {
    background-color: #899fe1;
    background-size: 100% 100%;
    height: 156px;
    // margin: 0 auto;
    position: relative;
    text-align: center;

    img {
      width: 100px;
      height: 100px;
      display: block;
      position: absolute;
      bottom: -50px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      z-index: 1;
      border: 5px solid #fff;
    }
  }
}

.login-form {
  padding: 100px 30px 0 30px;

  .el-form-item {
    margin-bottom: 20px;
  }

  .verify-show {
    background-color: #fff;
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;

  }
}
</style>
