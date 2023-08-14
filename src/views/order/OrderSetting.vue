<template>
  <el-form class="demo-form-inline" :model="ruleForm" ref="formInlineRef" :rules="rules">
    <el-form-item label-width="150" label="红包金额设置">
      <el-radio-group v-model="ruleForm.settingType" class="custom-radio">
        <el-radio label="FN">固定金额</el-radio>
        <el-radio label="SJ">随机金额</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label-width="150" label="固定金额" v-if="ruleForm.settingType == 'FN'">
      <el-input v-model="ruleForm.money" placeholder="" maxlength="18" clearable style="width: 140px">
        <template #append>元</template>
      </el-input>
    </el-form-item>
    <el-form-item label-width="150" label="金额范围" v-if="ruleForm.settingType == 'SJ'">
      <el-input v-model="ruleForm.startMoney" placeholder="" maxlength="18" clearable style="width: 140px">
        <template #append>元</template>
      </el-input>
      <span class="space-tips">-</span>
      <el-input v-model="ruleForm.endMoney" placeholder="" maxlength="18" clearable style="width: 140px">
        <template #append>元</template>
      </el-input>
    </el-form-item>
    <el-form-item label-width="150" label="评价有礼活动开关">
      <el-switch v-model="ruleForm.switch" style="--el-switch-on-color: #18bc9c; " />
    </el-form-item>
    <el-form-item label-width="150" label="红包祝福语" prop="greeting">
      <el-input v-model="ruleForm.greeting" placeholder="祝您开心快乐每一天！" clearable />
    </el-form-item>
    <el-form-item label-width="150" label="经理联系微信">
      <el-input v-model="ruleForm.wechat" placeholder="" disabled />
    </el-form-item>
    <el-form-item label-width="150" label="经理联系电话">
      <el-input v-model="ruleForm.phone" placeholder="" disabled />
    </el-form-item>
    <el-form-item label-width="150" label="投诉建议电话">
      <el-input v-model="ruleForm.phone" placeholder="" disabled />
    </el-form-item>
    <el-form-item label-width="150">
      <el-button class="custom-button-0" @click="submitForm(formInlineRef)">提交</el-button>
      <el-button @click="resetForm(formInlineRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import api from '@/api';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
const formInlineRef = ref<FormInstance>();
const ruleForm = reactive({
  greeting: '',
  wechat: '',
  phone: '',
  switch: false,
  settingType: 'SJ',//SJ,随机，FN，固定
  startMoney: '',
  endMoney: '',
  money: '',
});
const rules = reactive<FormRules>({});
onMounted(() => {
  getUser();
});
const getUser = async () => {
  const { redType, greetingType, greeting, maxMoney, minMoney, } = await api.getUserProfile();
  ruleForm.settingType = redType;
  ruleForm.switch = greetingType === 'P'
  ruleForm.startMoney = minMoney;
  ruleForm.endMoney = maxMoney
  ruleForm.greeting = greeting;
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log(ruleForm);
      let moneyMap = {}
      if (ruleForm.settingType == 'FN') {
        moneyMap = {
          setMoney: ruleForm.endMoney,
          redType: ruleForm.settingType,
        }
      } else {
        moneyMap = {
          maxMoney: ruleForm.endMoney,
          minMoney: ruleForm.startMoney,
          redType: ruleForm.settingType,
        }
      }

      await api.updateUser({
        ...{
          greetingType: ruleForm.switch ? 'P' : 'F',
          greeting: ruleForm.greeting,
        }, ...moneyMap
      })
      getUser()
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  ruleForm.money = ''
  ruleForm.startMoney = '';
  ruleForm.endMoney = ''
  formEl.resetFields();


};
</script>

<style   >
.demo-form-inline .el-input {
  --el-input-width: 400px;
}
</style>
