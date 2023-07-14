// index.ts
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import StorageInstance from './storage';
import { getQueryString } from './utils';
const defaultConfig = { baseURL: '/api', timeout: 60000 };
const storage = new StorageInstance(60 * 60 * 24 * 30, false);
class Axios {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = defaultConfig;

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(
      config => {
        // 一般会请求拦截里面加token
        let token = getQueryString('token');
        let accessToken = token ? token : storage.get('token');
        if (accessToken) {
          console.log('token:' + accessToken);
          (config.headers as AxiosRequestHeaders).Authorization = accessToken;
        } else {
          console.error('token获取失败');
        }
        return config;
      },
      (err: any) => {
        ElMessage.error(err.message);
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { errcode, errmsg, data } = response.data;
        // 根据自定义错误码判断请求是否成功
        if (errcode === 0) {
          // 将组件用的数据返回
          return response.data;
        } else {
          // 处理业务错误。
          ElMessage({
            showClose: false,
            message: `${errmsg}，请检查网络或联系管理员！`,
            type: 'error',
            duration: 1500
          });
          return Promise.reject(new Error(errmsg));
        }
      },
      (error: AxiosError) => {
        // 处理 HTTP 网络错误
        let message = '';
        // HTTP 状态码
        const status = error.response?.status;
        switch (status) {
          case 401:
            message = 'token 失效，请重新登录';
            // 这里可以触发退出的 action
            break;
          case 403:
            message = '拒绝访问';
            break;
          case 404:
            message = '请求地址错误';
            break;
          case 500:
            message = '服务器故障';
            break;
          default:
            message = '网络连接故障';
        }

        ElMessage({
          showClose: false,
          message: `${message}，请检查网络或联系管理员！`,
          type: 'error',
          duration: 1500
        });
        return Promise.reject(error);
      }
    );
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }
  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }
  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }
}
const $axios = new Axios(defaultConfig);
export default $axios;
// 参考：https://developer.aliyun.com/article/1058106#slide-16
