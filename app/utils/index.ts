import { __TOKEN__ } from './constant';
import moment from 'moment';

/**
 * 模块名: 设置缓存
 * @param string token
 */
export const setLocalStorage = (token: string, key: string = __TOKEN__) => localStorage.setItem(key, token);

/**
 * 模块名:获取缓存
 */
export const getLocalStorage = (key: string = __TOKEN__) => localStorage.getItem(key);

/**
 * 模块名: 移除token
 */
export const moveLocalStorageToken = () => localStorage.removeItem(__TOKEN__);

/**
 * 模块名:移除所有缓存
 */
export const allLocalStorageMove = () => {
  localStorage.clear();
  sessionStorage.clear();
};

/**
 * 转换为本地时间
 * @param str 后端放回时间 【2024-09-17T14:28:24.437Z】
 */
export const toLocalTime = (str: string): string => {
  const date = moment(str).local(); // 转换为本地时间
  return date.format('YYYY-MM-DD HH:mm:ss');
};
