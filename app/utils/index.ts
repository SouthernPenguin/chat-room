import { __TOKEN__ } from './constant';

/**
 * 模块名: 设置token
 * @param string token
 */
export const setLocalStorageToken = (token: string) => localStorage.setItem(__TOKEN__, token);

/**
 * 模块名:获取token
 */
export const getLocalStorageToken = () => localStorage.getItem(__TOKEN__);

/**
 * 模块名: 移除token
 */
export const moveLocalStorageToken = () => localStorage.removeItem(__TOKEN__);

/**
 * 模块名:移除所有缓存
 */
export const allLocalStorageMove = () => localStorage.clear();
