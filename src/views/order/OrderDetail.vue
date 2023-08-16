<template>
  <el-form :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="订单号">
      <el-input v-model="info.id" disabled />
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="info.wechatName" disabled />
    </el-form-item>
    <el-form-item label="评价图片">
      <img :src="info.pictro" alt="" class="order-pic" />
    </el-form-item>
    <el-form-item label="审核金额">
      <el-input v-model="info.comMoney" disabled />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="info.remark" disabled :rows="3" type="textarea" placeholder="备注" />
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
const ruleFormRef = ref<FormInstance>();
// const emits = defineEmits(['handleClose', 'handleCancel']);
const form = reactive({
  name: '',
  orderNo: '',
  pic: '',
  remark: '',
  money: '',
});
const props = defineProps({
  info: {} as any,
});
onMounted(() => {
  console.log(props.info);
});
const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  blackListType: [
    {
      required: true,
      message: 'Please select Activity zone',
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

// const submitForm = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       emits('handleClose');
//       console.log('submit!' + form.name);
//     } else {
//       console.log('error submit!', fields);
//     }
//   });
// };
// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   formEl.resetFields();
//   emits('handleCancel');
// };
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
