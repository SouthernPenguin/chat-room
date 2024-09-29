/**
 * 模块名: 网络请求
 * 代码描述:
 * 作者:https://github.com/hsyq/lite-demo/tree/main
 * 创建时间:2024/09/08 10:04:08
 */
import axios from 'axios';
import { message as AntMessage } from 'antd';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { __TOKEN__ } from '@/app/utils/constant';

/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}

const service: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 0,
});

/* 请求拦截器 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(__TOKEN__)}`;
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
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = '';
    // HTTP 状态码
    const status = error.response?.status;
    // debugger;
    switch (status) {
      case 400:
        message = error.response?.data.message;
        break;
      case 401:
        message = 'token 失效，请重新登录';
        // loginUser.loginOut();
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求地址不存在';
        break;
      case 500:
        message = '服务器故障，请检查网络或联系管理员！';
        break;
      default:
        message = '网络连接故障，请检查网络或联系管理员！';
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

  delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<Result<T>> {
    return service.delete(url, config);
  },
};

/* 导出 axios 实例 */
export default service;
