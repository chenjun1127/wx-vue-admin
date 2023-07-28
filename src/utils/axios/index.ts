// index.ts
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ElMessage } from "element-plus";
import storage from '../storage/instance';
import { getQueryString } from '../utils';
import { showMessage } from './status';
const defaultConfig = { baseURL: '/api', timeout: 60000 };

class Axios {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = defaultConfig;

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
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
        const { errcode, errmsg } = response.data;
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
        // HTTP 状态码
        const status = error.response?.status; 
        ElMessage({
          showClose: false,
          message: `${showMessage(status)}，请检查网络或联系管理员！`,
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
