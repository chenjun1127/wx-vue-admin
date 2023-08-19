<template>
  <el-form :model="form" ref="ruleFormRef" style="padding: 0">
    <el-form-item>
      <el-radio-group v-model="form.refuse" class="ml-4">
        <el-radio v-for="(item, index) in Object.values(refuseMap)" :key="index" size="large" :label="index">
          {{ item }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <div style="margin-left: 210px">
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { refuseMap } from '@/constant/object';
import type { FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
const ruleFormRef = ref<FormInstance>();
const emits = defineEmits(['handleClose', 'handleCancel']);

const form = reactive({
  refuse: 0,
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('handleClose', (refuseMap as any)[form.refuse]);
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
