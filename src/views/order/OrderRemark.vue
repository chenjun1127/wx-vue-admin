<template>
  <el-form :model="form" label-width="120px" ref="ruleFormRef">
    <el-form-item label="备注">
      <el-input v-model="form.textarea" :rows="3" type="textarea" placeholder="备注" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
      <el-button @click="resetForm(ruleFormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
const ruleFormRef = ref<FormInstance>();
const emits = defineEmits(['handleClose', 'handleCancel']);

const form = reactive({
  textarea: '',
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('handleClose');
      console.log('submit!' + form.textarea);
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
