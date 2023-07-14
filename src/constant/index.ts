export type menuType = {
  name: string;
  path: string;
  iconName?: string;
  invalid?: boolean;
};
export type navType = {
  menu: Array<menuType>;
  show: boolean;
  show2?: boolean;
};
export const menuList: Array<menuType> = [
  {
    name: '首页',
    path: '/',
    iconName: 'icon-zhuye'
  },
  // {
  //   name: '天眼中心',
  //   path: '/',
  //   iconName: 'icon-yanjing',
  //   invalid: true
  // },
  {
    name: '小区数据',
    path: '/community',
    iconName: 'icon-shuju'
  },
  {
    name: '房屋数据',
    path: '/house',
    iconName: 'icon-baohanxiaoqusvg'
  },
  {
    name: '人口数据',
    path: '/resident',
    iconName: 'icon-yonghu'
  },
  {
    name: '车辆数据',
    path: '/car',
    iconName: 'icon-cheliang'
  },
  {
    name: '三防数据',
    path: '/safe-data',
    iconName: 'icon-jiangbei'
  },
  {
    name: '出行记录',
    path: '/travel-records',
    iconName: 'icon-chuhang'
  }
  // {
  //   name: '特殊群体',
  //   path: '/special',
  //   iconName: 'icon-aixin'
  // },
  // {
  //   name: '布控中心',
  //   path: '/control',
  //   iconName: 'icon-fangkonglei'
  // },
  // {
  //   name: '监控中心',
  //   path: '/',
  //   iconName: 'icon-jiankong_o',
  //   invalid: true
  // },
  // {
  //   name: '抓拍记录',
  //   path: '/snap',
  //   iconName: 'icon-paizhao'
  // },
  // {
  //   name: '告警中心',
  //   path: '/warn',
  //   iconName: 'icon-gaojing'
  // },
  ,
  {
    name: '投诉保修',
    path: '/repair',
    iconName: 'icon-guzhangtousu'
  },
  {
    name: '重点场所',
    path: '/place',
    iconName: 'icon-jianzhu'
  }
];

export interface IWarn {
  time: string;
  name?: string;
  address: string;
  pic?: string;
  event: string;
}

export interface ITableWarnCol {
  prop: string;
  label: string;
  width?: string;
  slot?: boolean;
}

export interface IPageData {
  pageNum: number;
  pageSize: number;
  total: number;
  currentPage: number;
}

export enum CommunityLevelEnum {
  provinceLevel = 3,
  cityLevel = 4,
  townLevel = 5,
  streetLevel = 6,
  areaLevel = 7
}
export const communityCodeMap = {
  3: 'provence_code',
  4: 'city_code',
  5: 'town_code',
  6: 'street_code',
  7: 'area_code'
};
