import { __TOKEN__ } from './constant';

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
