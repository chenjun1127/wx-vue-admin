export function checkPhone(value: any, callback: any) {
  if (!/^1(3|4|5|6|7|8|9)+\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号'));
  }
}

export function checkIdCard(value: any, callback: any) {
  if (!/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
    callback(new Error('请输入正确的身份证号码'));
  }
}
