/**
 * 模块名: 网络请求
 * 代码描述:
 * 作者:https://github.com/hsyq/lite-demo/tree/main
 * 创建时间:2024/09/08 10:04:08
 */
import axios from 'axios';
import { message as AntMessage } from 'antd';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { __TOKEN__, __REFRESH_TOKEN__ } from '@/app/utils/constant';
import { allLocalStorageMove, getLocalStorage, setLocalStorage } from '@/app/utils';
import { signOut } from 'next-auth/react';

/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}

interface PendingTask {
  config: InternalAxiosRequestConfig;
  resolve: Function;
}

// 是否还需要刷新token的标识
let refreshing = false;
// 存储未完成的请求
const task: PendingTask[] = [];

const service: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 0,
});

// 刷新token
const refreshTokenFn = async () => {
  const refreshToken = getLocalStorage(__REFRESH_TOKEN__);

  if (!refreshToken) {
    return Promise.reject('refresh_token is empty');
  }

  // 这里会等到并发的请求都执行完之后再执行
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, { refresh: refreshToken });
  return res.data.data;
};

/* 请求拦截器 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${getLocalStorage()}`;
    return config;
  },
  (error: AxiosError) => {
    AntMessage.error(error);
    return Promise.reject(error);
  },
);

/* 响应拦截器 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data;
    // 根据自定义错误码判断请求是否成功
    if (code === 0) {
      // 将组件用的数据返回
      return response.data;
    } else {
      // 处理业务错误。
      AntMessage.error(message);
      return Promise.reject(new Error(message));
    }
  },
  async (error: AxiosError) => {
    const { config } = error.response;
    // 如果正在刷新token，则将失败的请求挂起,
    // 存入task中等待刷新token完成在全部执行出来
    if (refreshing) {
      return new Promise(resolve => {
        task.push({
          config,
          resolve,
        });
      });
    }
    // 处理 HTTP 网络错误
    let message = '';
    // HTTP 状态码
    const status = error.response?.status;
    if (status === 400) {
      message = error.response?.data.message;
    }

    if (status === 401 && config.url !== '/auth/refresh') {
      // 此时需要刷新了
      refreshing = true;
      try {
        const res = await refreshTokenFn();
        // 刷新token成功
        refreshing = false;
        // 重新发送请求
        task.forEach(item => {
          item.resolve(service(item.config));
        });
        setLocalStorage(res.refreshToken, __REFRESH_TOKEN__);
        setLocalStorage(res.token);
        return service(config);
      } catch (error) {
        refreshing = false;
        message = 'token 失效，请重新登录';
        AntMessage.error(message);
        allLocalStorageMove();
        signOut({ callbackUrl: '/signin' });
        return Promise.reject(new Error('Token过期'));
      }
    }

    if (status === 403) {
      message = '拒绝访问';
    }

    if (status === 404) {
      message = '请求地址不存在';
    }

    if (status === 500) {
      message = '服务器故障，请检查网络或联系管理员！';
    }

    AntMessage.error(message);

    return Promise.reject(error);
  },
);

/* 导出封装的请求方法 */
export const http = {
  get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<Result<T>> {
    return service.get(url, config);
  },

  post<T>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<Result<T>> {
    return service.post(url, data, config);
  },

  put<T>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<Result<T>> {
    return service.put(url, data, config);
  },

  patch<T>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<Result<T>> {
    return service.patch(url, data, config);
  },

  delete<T>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<Result<T>> {
    return service.delete(url, data, config);
  },
};

/* 导出 axios 实例 */
export default service;
