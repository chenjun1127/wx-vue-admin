// index.ts
import { IResponseData } from '@/types';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { showMessage } from './status';
import storage from '../storage/instance';
import router from '@/router';
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
        // let token = getQueryString('token');
        // let accessToken = token ? token : storage.get('token');
        // if (accessToken) {
        //   console.log('token:' + accessToken);
        //   (config.headers as AxiosRequestHeaders).Authorization = accessToken;
        // } else {
        //   console.error('token获取失败');
        // }
        return config;
      },
      (err: any) => {
        ElMessage.error(err.message);
        return Promise.reject(err);
      },
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { code, msg, data }: IResponseData<any> = response.data;
        // 根据自定义错误码判断请求是否成功
        if (code === 1) {
          // 将组件用的数据返回
          return data;
        } else {
          // 处理业务错误。
          ElMessage({
            showClose: false,
            message: `${msg}，请检查网络或联系管理员！`,
            type: 'error',
            duration: 1500,
          });
          return Promise.reject(new Error(msg));
        }
      },
      (error: AxiosError) => {
        // HTTP 状态码
        const status = error.response?.status;
        ElMessage({
          showClose: false,
          message: showMessage(status),
          type: 'error',
          duration: 1500,
          onClose: () => {
            storage.clear();
            router.replace('/login');
          },
        });
        return Promise.reject(error);
      },
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
