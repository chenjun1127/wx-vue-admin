<template>
  <el-form class="demo-form-inline" :model="formInline" ref="formInlineRef" :rules="rules">
    <el-form-item label-width="150" label="红包金额设置">
      <el-radio-group v-model="formInline.settingType" class="custom-radio">
        <el-radio label="1">固定金额</el-radio>
        <el-radio label="2">随机金额</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label-width="150" label="固定金额" v-if="formInline.settingType == '1'">
      <el-input v-model="formInline.money" placeholder="" maxlength="18" clearable style="width: 140px">
        <template #append>元</template>
      </el-input>
    </el-form-item>
    <el-form-item label-width="150" label="金额范围" v-else>
      <el-input v-model="formInline.startMoney" placeholder="" maxlength="18" clearable style="width: 140px">
        <template #append>元</template>
      </el-input>
      <span class="space-tips">-</span>
      <el-input v-model="formInline.endMoney" placeholder="" maxlength="18" clearable style="width: 140px">
        <template #append>元</template>
      </el-input>
    </el-form-item>
    <el-form-item label-width="150" label="评价有礼活动开关" >
      <el-switch v-model="formInline.switch" style="--el-switch-on-color: #18bc9c; " />
    </el-form-item>
    <el-form-item label-width="150" label="红包祝福语" prop="user">
      <el-input v-model="formInline.user" placeholder="祝您开心快乐每一天！" clearable />
    </el-form-item>
    <el-form-item label-width="150" label="经理联系微信">
      <el-input v-model="formInline.wechat" placeholder="Approved by" disabled />
    </el-form-item>
    <el-form-item label-width="150" label="经理联系电话">
      <el-input v-model="formInline.phone" placeholder="Approved by" disabled />
    </el-form-item>
    <el-form-item label-width="150" label="投诉建议电话">
      <el-input v-model="formInline.phone" placeholder="Approved by" disabled />
    </el-form-item>

    <el-form-item label-width="150">
      <el-button class="custom-button-0" @click="submitForm(formInlineRef)">提交</el-button>
      <el-button @click="resetForm(formInlineRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
const formInlineRef = ref<FormInstance>();
const formInline = reactive({
  user: '',
  wechat: '',
  phone: '',
  switch: false,
  settingType: '1',
  startMoney: '',
  endMoney: '',
  money: '',
});
const rules = reactive<FormRules>({});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {

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

};
</script>

<style   >
.demo-form-inline .el-input {
  --el-input-width: 400px;
}
</style>
