import { ElLoading } from 'element-plus';
let loading: any;
const defaultOptions = {
  lock: true,
  text: '加载数据中',
  background: 'rgba(0, 0, 0, 0.1)',
};
export default {
  // 此时的参数 el 是 加载服务的标签
  showLoading(el: any) {
    loading = ElLoading.service({
      target: el,
      lock: true,
      ...defaultOptions,
    });
  },
  // 关闭
  hideLoading() {
    loading.close();
  },
};
