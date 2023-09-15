<template>
  <el-form :model="form" ref="ruleFormRef" :rules="rules">
    <el-form-item prop="money">
      <el-input v-model="form.money" placeholder="请输入金额(最少1元)" />
    </el-form-item>
    <el-form-item>
      <div style="margin-left: 114px;">
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { valueIsNaN } from '@/utils/utils';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
const ruleFormRef = ref<FormInstance>();
const emits = defineEmits(['handleClose', 'handleCancel']);
const form = reactive({
  money: '' as any,
});
var checkMoney = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('金额不能为空，最少1元'));
  } else {
    var _value = parseFloat(value);
    if (_value >= 1 && valueIsNaN((_value))) {
      callback();
    } else {
      return callback(new Error('请输入正确的金额'));
    }
  }
};
const rules = reactive<FormRules>({

  money: [{ required: false, validator: checkMoney, trigger: 'blur' }],




});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('handleClose',form.money);
      console.log('submit!' + form.money);
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
