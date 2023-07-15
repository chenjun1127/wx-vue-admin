export type menuType = {
  name: string;
  path: string;
  iconName?: string;
  invalid?: boolean;
  children?: any;
  active?: boolean;
};
export type navType = {
  menu: Array<menuType>;
  show: boolean;
  show2?: boolean;
};
export const menuList: Array<menuType> = [
  {
    name: '数据中心',
    path: '/home',
    iconName: 'icon-shuju',
  },
  {
    name: '常规管理',
    path: '',
    iconName: 'icon-31shezhi',
    active: false,
    children: [
      {
        name: '个人资料',
        path: '/manage',
        iconName: 'icon-yonghu',
      },
    ],
  },
  {
    name: '订单管理',
    path: '/order',
    iconName: 'icon-dingdan',
  },
  {
    name: '红包审核记录',
    path: '/check',
    iconName: 'icon-hongbaoiocn',
  },
  {
    name: '余额充值记录',
    path: '/recharge',
    iconName: 'icon-yue',
  },
  {
    name: '余额变动记录',
    path: '/change',
    iconName: 'icon-guzhangtousu',
  },
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
  areaLevel = 7,
}
export const communityCodeMap = {
  3: 'provence_code',
  4: 'city_code',
  5: 'town_code',
  6: 'street_code',
  7: 'area_code',
};
