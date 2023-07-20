<template>
  <div class="inner">
    <div class="check-container">
      <el-form :inline="true" :model="ruleForm" ref="formInlineRef" class="common-form-inline" :rules="rules">
        <el-form-item label-width="85" prop="nickName" label="微信昵称">
          <el-input v-model="ruleForm.nickName" placeholder="微信昵称" maxlength="18" clearable style="width: 200px">
          </el-input>
        </el-form-item>
        <el-form-item label-width="85" prop="phone" label="手机号码">
          <el-input v-model="ruleForm.phone" placeholder="手机号码" maxlength="18" clearable style="width: 200px">
          </el-input>
        </el-form-item>

        <el-form-item label-width="85" prop="startMoney" label="审核金额">
          <el-input v-model="ruleForm.startMoney" placeholder="审核金额" maxlength="18" clearable style="width: 85px">
          </el-input>
          <span class="space-tips">-</span>
          <el-input v-model="ruleForm.endMoney" placeholder="审核金额" maxlength="18" clearable style="width: 85px">
          </el-input>
        </el-form-item>
        <el-form-item label-width="85" label="提交时间">
          <el-date-picker v-model="ruleForm.submitTime" type="date" label="提交时间" placeholder="请选择" style="width: 200px" />
        </el-form-item>

        <el-form-item label-width="85">
          <el-button class="custom-button-0" @click="submitForm(formInlineRef)">提交</el-button>
          <el-button @click="resetForm(formInlineRef)">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="form-buttons-bar">
        <el-button class="custom-button-1" color="red" @click="submitForm(formInlineRef)">批量审核</el-button>
        <el-button class="custom-button-2" @click="submitForm(formInlineRef)">导出</el-button>
        <el-button class="custom-button-3" @click="submitForm(formInlineRef)">$余额8.5元</el-button>
        <el-button @click="submitForm(formInlineRef)">$冲值金额</el-button>
        <div class="tips">有效期183天</div>
        <el-button class="custom-button-4" @click="submitForm(formInlineRef)">7天内重复订单</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
const emits = defineEmits(['handleSubmit', 'handleReset']);
const formInlineRef = ref<FormInstance>();
const ruleForm = reactive<any>({
  statusList: ['待审核', '已审核', '已拒绝'],
  receiveStatusList: ['未发送', '已领取', '已过期', '已发放'],
  merchantName: '',
  merchantLocation: '',
  phone: '',
  nickName: '',
  status: '',
  receiveStatus: '',
  startMoney: '',
  endMoney: '',
  submitTime: '',
  handleTime: ''
});
const rules = reactive<FormRules>({});
onMounted(() => { });
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emits('handleSubmit', ruleForm);
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  // if (areaSelect.currentArea.data.level === CommunityLevelEnum.provinceLevel) {
  //   ruleForm.townList = [];
  //   ruleForm.streetList = [];
  //   ruleForm.villageList = [];
  // } else if (areaSelect.currentArea.data.level === CommunityLevelEnum.cityLevel) {
  //   ruleForm.streetList = [];
  //   ruleForm.villageList = [];
  // } else if (areaSelect.currentArea.data.level === CommunityLevelEnum.townLevel) {
  //   ruleForm.villageList = [];
  // }
  emits('handleReset', ruleForm);
};
// const selectStatus = (e: any) => {
//   console.log(e);
// };
// const selectReceiveStatus = (e: any) => {
//   console.log(e);
// };
</script>

<style lang="scss">


.space-tips {
  display: inline-block;
  width: 30px;
  color: #333;
  text-align: center;
}
</style>
