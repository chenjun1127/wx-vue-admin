<template>
  <div class="check-container">
    <el-form :inline="true" :model="ruleForm" ref="formInlineRef" class="common-form-inline" :rules="rules">
      <el-form-item label-width="85" prop="merchantName" label="商户名称">
        <el-input v-model="ruleForm.merchantName" placeholder="商户名称" maxlength="18" clearable style="width: 200px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="merchantLocation" label="商户位置">
        <el-input v-model="ruleForm.merchantLocation" placeholder="商户位置" maxlength="18" clearable style="width: 200px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="nickName" label="微信昵称">
        <el-input v-model="ruleForm.nickName" placeholder="微信昵称" maxlength="18" clearable style="width: 200px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="phone" label="手机号码">
        <el-input v-model="ruleForm.phone" placeholder="手机号码" maxlength="18" clearable style="width: 200px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" prop="status" label="状态">
        <el-select v-model="ruleForm.status" @change="selectStatus($event)" placeholder="请选择" no-data-text="暂无数据" style="width: 200px">
          <el-option :value="item" :label="item" v-for="(item, index) in ruleForm.statusList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="85" prop="startMoney" label="审核金额">
        <el-input v-model="ruleForm.startMoney" type="number" placeholder="审核金额" maxlength="18" clearable style="width: 85px"> </el-input>
        <span class="space-tips">-</span>
        <el-input v-model="ruleForm.endMoney" type="number" placeholder="审核金额" maxlength="18" clearable style="width: 85px"> </el-input>
      </el-form-item>
      <el-form-item label-width="85" label="提交时间">
        <el-date-picker v-model="ruleForm.submitTime" type="date" label="提交时间" placeholder="请选择" style="width: 200px" />
      </el-form-item>
      <el-form-item label-width="85" label="处理时间">
        <el-date-picker v-model="ruleForm.handleTime" type="date" label="处理时间" placeholder="请选择" style="width: 200px" />
      </el-form-item>
      <el-form-item label-width="85" prop="receiveStatus" label="领取状态">
        <el-select v-model="ruleForm.receiveStatus" @change="selectReceiveStatus($event)" placeholder="请选择" no-data-text="暂无数据" style="width: 200px">
          <el-option :value="item" :label="item" v-for="(item, index) in ruleForm.receiveStatusList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="85">
        <el-button color="#18bc9c" class="custom-button" @click="submitForm(formInlineRef)">提交</el-button>
        <el-button @click="resetForm(formInlineRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="form-buttons-bar">
      <el-button @click="submitForm(formInlineRef)">提交</el-button>
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
  handleTime: '',
});
const rules = reactive<FormRules>({});
onMounted(() => {});
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
const selectStatus = (e: any) => {
  console.log(e);
};
const selectReceiveStatus = (e: any) => {
  console.log(e);
};
</script>

<style lang="scss">
.space-tips {
  display: inline-block;
  width: 30px;
  color: #333;
  text-align: center;
}
</style>
