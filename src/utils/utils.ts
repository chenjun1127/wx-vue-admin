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
    var obj: any = {};
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

export function getQueryString(name: any) {
  let reg: any = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
  var context = '';
  if (r != null) context = decodeURIComponent(r[2]);
  reg = null;
  r = null;
  return context == null || context == '' || context == 'undefined' ? '' : context;
}
