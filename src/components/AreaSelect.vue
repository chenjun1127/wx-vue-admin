<template>
  <div class="area-select-container">
    <el-form :inline="true" :model="ruleForm" ref="formInlineRef" class="common-form-inline" :rules="rules">
      <el-form-item prop="selectProvince" v-if="ruleForm.showProvince">
        <el-select v-model="ruleForm.selectProvince.name" @change="selectProvinceFun($event)" placeholder="请选择省份" no-data-text="暂无数据">
          <el-option :value="item" :label="item.name" v-for="(item, index) in ruleForm.provinceList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="selectCity" v-if="ruleForm.showCity">
        <el-select v-model="ruleForm.selectCity.name" @change="selectCityFun($event)" placeholder="请选择城市" no-data-text="暂无数据">
          <el-option :value="item" :label="item.name" v-for="(item, index) in ruleForm.cityList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="selectTown" v-if="ruleForm.showTown">
        <el-select v-model="ruleForm.selectTown.name" @change="selectTownFun($event)" placeholder="请选择区县" no-data-text="暂无数据">
          <el-option :value="item" :label="item.name" v-for="(item, index) in ruleForm.townList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="selectStreet" v-if="ruleForm.showStreet">
        <el-select v-model="ruleForm.selectStreet.name" @change="selectStreetFun($event)" placeholder="请选择街道" no-data-text="暂无数据">
          <el-option :value="item" :label="item.query_name" v-for="(item, index) in ruleForm.streetList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="selectVillage" v-if="ruleForm.showVillage">
        <el-select v-model="ruleForm.selectVillage.name" @change="selectVillageFun($event)" placeholder="请选择社区" no-data-text="暂无数据">
          <el-option :value="item" :label="item.query_name" v-for="(item, index) in ruleForm.villageList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <template v-if="showName">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名" clearable style="width: 190px"> </el-input>
        </el-form-item>
      </template>
      <template v-if="showTel">
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" maxlength="11" clearable style="width: 190px"> </el-input>
        </el-form-item>
      </template>
      <template v-if="showIdCard">
        <el-form-item prop="idCard">
          <el-input v-model="ruleForm.idCard" placeholder="请输入身份证" maxlength="18" clearable style="width: 190px"> </el-input>
        </el-form-item>
      </template>
      <slot name="formName"></slot>
      <el-form-item>
        <el-button @click="submitForm(formInlineRef)">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(formInlineRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import api from '@/api';
import { CommunityLevelEnum } from '@/constant';
import { useAreaSelectStore } from '@/stores/areaSelect';
import type { AreaData, DefaultForm } from '@/types/type';
import { areaSelectSubscribe } from '@/utils/subscribe';
import { getDefaultParamsByLevel, getParamsByLevel, getParamsObj } from '@/utils/utils';
import type { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
const emits = defineEmits(['handleSubmit', 'handleReset']);
const formInlineRef = ref<FormInstance>();
const areaSelect = useAreaSelectStore();
defineProps({
  showStreet: {
    type: Boolean,
    default: true,
  },
  showName: {
    type: Boolean,
    default: true,
  },
  showIdCard: {
    type: Boolean,
    default: true,
  },
  showTel: {
    type: Boolean,
    default: true,
  },
  formName: {
    type: String,
  },
});

const ruleForm = reactive<AreaData & DefaultForm>({
  provinceList: [],
  cityList: [],
  townList: [],
  streetList: [],
  villageList: [],
  selectProvince: {},
  selectCity: {},
  selectTown: {},
  selectStreet: {},
  selectVillage: {},
  level: 3,
  phone: '',
  idCard: '',
  name: '',
  showProvince: false,
  showCity: false,
  showTown: false,
  showStreet: true,
  showVillage: true,
});
const rules = reactive<FormRules>({
  // phone: [
  //   { required: false },
  //   {
  //     type: 'string',
  //     message: '电话必须为11位数字',
  //   },
  //   {
  //     validator: checkPhone,
  //     trigger: 'blur',
  //   },
  // ],
  // idCard: [
  //   { required: false },
  //   {
  //     required: false,
  //     validator: checkIdCard,
  //     trigger: 'blur',
  //   },
  // ],
});
const { area, isPublicNet } = window.config;
onMounted(async () => {
  var result = await queryArea(getParamsObj({ ...getDefaultParamsByLevel(areaSelect.currentArea.data.level, areaSelect.currentArea.data.code), timestamp: Date.now() }));
  ruleForm.streetList = result.data;
});
const queryArea = async (params: any) => {
  return await api.getArea(params);
};
const selectProvinceFun = async (event: any) => {
  if (event) {
    ruleForm.selectProvince.name = event.name;
    ruleForm.selectProvince.level = event.level;
    ruleForm.selectProvince.code = event.code;
    const { code, data } = await queryArea({ level: 4, parentId: event.code });
    ruleForm.cityList = code == 1 ? data : [];
    ruleForm.selectCity = {};
    ruleForm.selectTown = {};
    ruleForm.selectStreet = {};
    ruleForm.selectVillage = {};
    ruleForm.selectTown = {};
    ruleForm.townList = [];
    ruleForm.streetList = [];
    ruleForm.villageList = [];
  } else {
    ruleForm.cityList = [];
    ruleForm.selectCity = {};
  }
};
const selectCityFun = async (event: any) => {
  if (event) {
    ruleForm.selectCity.name = event.name;
    ruleForm.selectCity.level = event.level;
    ruleForm.selectCity.code = event.code;
    const { code, data } = await queryArea({ level: 5, parentId: event.code });
    ruleForm.townList = code == 1 ? data : [];
    ruleForm.selectTown = {};
    ruleForm.streetList = [];
    ruleForm.selectStreet = {};
    ruleForm.villageList = [];
    ruleForm.selectVillage = {};
  } else {
    ruleForm.townList = [];
    ruleForm.selectTown = {};
  }
};
const selectTownFun = async (event: any) => {
  if (event) {
    ruleForm.selectTown.name = event.name;
    ruleForm.selectTown.level = event.level;
    ruleForm.selectTown.code = event.code;
    const { code, data } = await queryArea({ level: 6, parentId: event.code });
    ruleForm.streetList = code == 1 ? data : [];
    ruleForm.selectStreet = {};
    ruleForm.selectVillage = {};
    ruleForm.villageList = [];
  } else {
    ruleForm.streetList = [];
    ruleForm.selectStreet = {};
  }
};

const selectStreetFun = async (event: any) => {
  if (event) {
    ruleForm.selectStreet.name = event.query_name;
    ruleForm.selectStreet.level = event.level;
    ruleForm.selectStreet.code = event.code;
    const provence_code = isPublicNet ? area.defaultProvinceCode : area.privateProvinceCode;
    const { code, data } = await queryArea(getParamsObj({ ...getParamsByLevel(event.level, event.code), provence_code, timestamp: Date.now() }));
    ruleForm.villageList = code == 0 ? data : [];
    ruleForm.selectVillage = {};
  } else {
    ruleForm.villageList = [];
    ruleForm.selectVillage = {};
  }
};
const selectVillageFun = (event: any) => {
  if (event) {
    ruleForm.selectVillage.name = event.query_name;
    ruleForm.selectVillage.level = event.level;
    ruleForm.selectVillage.code = event.code;
  }
};
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
  if (areaSelect.currentArea.data.level === CommunityLevelEnum.provinceLevel) {
    ruleForm.townList = [];
    ruleForm.streetList = [];
    ruleForm.villageList = [];
  } else if (areaSelect.currentArea.data.level === CommunityLevelEnum.cityLevel) {
    ruleForm.streetList = [];
    ruleForm.villageList = [];
  } else if (areaSelect.currentArea.data.level === CommunityLevelEnum.townLevel) {
    ruleForm.villageList = [];
  }
  emits('handleReset', ruleForm);
};
// areaSelectSubscribe((data: any) => {
//   console.log(`当前行政区`, data);
//   if (data.level === CommunityLevelEnum.provinceLevel) {
//     ruleForm.cityList = data.list;
//     ruleForm.showCity = true;
//     ruleForm.showTown = true;
//     ruleForm.showStreet = true;
//     ruleForm.showVillage = true;
//   } else if (data.level === CommunityLevelEnum.cityLevel) {
//     ruleForm.townList = data.list;
//     ruleForm.showCity = false;
//     ruleForm.showTown = true;
//     ruleForm.showStreet = true;
//     ruleForm.showVillage = true;
//   } else if (data.level === CommunityLevelEnum.townLevel) {
//     ruleForm.streetList = data.list;
//     ruleForm.showCity = false;
//     ruleForm.showTown = false;
//     ruleForm.showStreet = true;
//     ruleForm.showVillage = true;
//   } else if (data.level >= CommunityLevelEnum.streetLevel) {
//     ruleForm.villageList = data.list;
//     ruleForm.showCity = false;
//     ruleForm.showTown = false;
//     ruleForm.showStreet = false;
//     ruleForm.showVillage = true;
//   }
//   if (formInlineRef.value) {
//     formInlineRef.value.resetFields();
//   }
// });
</script>
<style lang="scss" scoped>
.area-select-container {
  position: relative;
  padding: 15px 0;
}
</style>
