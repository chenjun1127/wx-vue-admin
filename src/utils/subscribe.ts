import { CommunityLevelEnum } from '@/constant';
import { useAreaSelectStore } from '@/stores/areaSelect';

export const areaSelectStore = useAreaSelectStore();
export const areaSelectSubscribe = (callback: Function) => {
  areaSelectStore.$subscribe(
    (mutation, state) => {
      if (mutation.storeId === 'areaSelect' && mutation.type !== 'direct') {
        callback({ ...state.currentArea.data, list: state.currentArea.list });
      }
    },
    {  deep: true }
  );
};

export const getDefaultParams = (code: string | number): object => {
  if (areaSelectStore.currentArea.data.level == CommunityLevelEnum.provinceLevel) {
    return { communityProvenceCode: code.toString() };
  } else if (areaSelectStore.currentArea.data.level == CommunityLevelEnum.cityLevel) {
    return { communityCityCode: code.toString() };
  } else if (areaSelectStore.currentArea.data.level == CommunityLevelEnum.townLevel) {
    return { communityTownCode: code.toString() };
  } else if (areaSelectStore.currentArea.data.level == CommunityLevelEnum.streetLevel) {
    return { streetCode: code.toString() };
  } else if (areaSelectStore.currentArea.data.level == CommunityLevelEnum.areaLevel) {
    return { villageCode: code.toString() };
  }
};

//得到表单搜索的结果
export const getFormResult = (value: any): object => {
  if (!value) return {};
  return {
    communityCityCode: value.selectCity.code,
    communityTownCode: value.selectTown.code,
    streetCode: value.selectStreet.code,
    villageCode: value.selectVillage.code
  };
};


