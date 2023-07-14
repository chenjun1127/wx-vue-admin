import type { IArea } from '@/types';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
const { area, isPublicNet } = window.config;
type AreaData = {
  areaName?: any;
  areaCode?: number | string;
};
type AreaSelect = {
  data: IArea & AreaData;
  list: any[];
  selectedList: string[];
};
// 如果为公网，默认查询北京市，如果为内网，默认查询南平市
export const useAreaSelectStore = defineStore('areaSelect', () => {
  const currentArea = reactive<AreaSelect>({
    data: {
      name: isPublicNet ? area.defaultName : area.privateName,
      code: isPublicNet ? area.defaultCode : area.privateCode,
      level: isPublicNet ? area.defaultLevel : area.privateLevel,
      areaName: isPublicNet ? area.defaultName : area.privateName,
      areaCode: isPublicNet ? area.defaultCode : area.privateCode, //对应地图当中获取Json的code，参考：http://datav.aliyun.com/portal/school/atlas/area_selector
    },
    list: [], //当前区域下的行政区列表
    selectedList: [],
  });
  const updateCurrentArea = (data: IArea) => {
    currentArea.data = data;
  };
  return { currentArea, updateCurrentArea };
});
