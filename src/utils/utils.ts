import { communityCodeMap } from '@/constant';
const md5 = require('md5');
// arr是传入的数组
export function groupByDesc(arr: Array<string>) {
  const [...zhCN] = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫杂';
  const [...EN] = 'abcdefghijklmnopqrstuvwxyz';
  // 中文在i、u、v下没有对应的汉字
  const [...desc] = 'abcdefghjklmnopqrstwxyz';
  const isChinese: any = /[\u4e00-\u9fa5]+/;
  const isSpecial: any = /[0-9*#@!%$&(),.+-]+/;
  const hashMap: any = {};

  function findIndex(obj: string) {
    for (let i = 0; i < isChinese.test(obj) ? zhCN.length : EN.length; i++) {
      if (obj.localeCompare(isChinese.test(obj) ? zhCN[i] : EN[i]) <= 0) {
        return i >= 1 ? i - 1 : 0;
      }
    }
    return 22;
  }

  arr.forEach(item => {
    let hashCode = isChinese.test(item) ? desc[findIndex(item)] : EN[findIndex(item)];
    isSpecial.test(item) ? (hashCode = '#') : '';
    if (!hashMap[hashCode]) {
      hashMap[hashCode] = [];
    }
    hashMap[hashCode].push(item);
  });
  return hashMap;
}

export function splitThousandSeparator(num: number): string {
  let prefix: string = '';
  if (num < 0) {
    num *= -1;
    prefix = '-';
  }
  let DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
  let MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
  let str: string = num.toString().replace(DIGIT_PATTERN, m => m.replace(MILI_PATTERN, ','));
  return prefix + str;
}

export const getParamsObj = (params: any) => {
  if (params?.constructor === Object) {
    var arr = [];
    var obj = {};
    for (var i in params) {
      if (params[i] && params[i] !== '') {
        arr.push(i + '=' + params[i]);
        obj[i] = params[i];
      }
    }
    return { ...obj, ...{ sign: paramsStrSort(arr.join('&')) } };
  } else {
    console.log('参数错误', typeof params);
  }
};

function paramsStrSort(paramsStr: string): string {
  const urlStr = paramsStr.split('&').sort().join('&');
  const pattern = /[=&\s]/g;
  const newStr = urlStr.replace(pattern, '');
  return md5(newStr);
}
// 得到行政级别参数
export const getParamsByLevel = (level: number, code: string | number) => {
  const obj = {};
  obj[communityCodeMap[level]] = code;
  return obj;
};
// 得到行政区级别参数，是否要加上省级
export const getDefaultParamsByLevel = (level: number, code: string | number) => {
  const { area, isPublicNet } = window.config;
  let provenceCode = { provence_code: isPublicNet ? area.defaultProvinceCode : area.privateProvinceCode };
  return { ...provenceCode, ...(level > 3 ? getParamsByLevel(level, code) : {}) };
};

// 递归过滤出所需要的数据
export const filterData = (data: Object, code: string | number) => {
  // const dataArr: any[] = Object.values(data).flat();
  for (let i in data) {
    const t = data[i].filter((e: any) => e.parentId == code);
    if (t.length) {
      return t;
    } else {
      var dartArr = Object.values(data[i][0] ?? []).filter(e => Array.isArray(e));
      return filterData(dartArr, code);
    }
  }
};

export const filterCommunityData = (arr: any[]) => {
  const data = findArrayObjects(arr);
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (Array.isArray(data[i].community_data)) {
      result.push(data[i].community_data);
    }
  }
  return result.flat();
};
// 递归查找数组对象中value值为数组的对象
function findArrayObjects(arr: any[]) {
  let result = [];
  if (!arr || !arr.length) return [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(findArrayObjects(arr[i]));
    } else if (typeof arr[i] === 'object') {
      const values = Object.values(arr[i] ?? []);
      if (values.some(val => Array.isArray(val))) {
        result.push(arr[i]);
      }
      result = result.concat(findArrayObjects(values));
    }
  }
  return result;
}

export function getQueryString(name: any) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
  var context = '';
  if (r != null) context = decodeURIComponent(r[2]);
  reg = null;
  r = null;
  return context == null || context == '' || context == 'undefined' ? '' : context;
}
