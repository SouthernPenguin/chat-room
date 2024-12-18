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

/**
 * 字符串截取，变为省略号
 * @param str
 */
export const stringCapture = (str: string | undefined) => {
  if (str && str.length > 4) {
    //如果字符长度超过10，后面的字符就变成...可自行调整长度和代替字符
    return str.substring(0, 5) + '...'; //截取从第一个字符开始，往后取10个字符，剩余的用...代替
  }
  return str;
};

/**
 * 模块名:计算日期时长
 */
export const calcDate = (timestamp: string) => {
  // 将时间戳转换为 JavaScript Date 对象
  const date = new Date(timestamp);

  // 获取当前时间
  const now = new Date();

  // 计算时间差（毫秒）
  const timeDifference = now - date;

  // 将毫秒转换为秒
  const seconds = Math.floor(timeDifference / 1000);

  // 定义一些时间单位
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;

  // 根据时间差的大小，显示不同的相对时间
  if (seconds < minute) {
    return '刚刚';
  } else if (seconds < hour) {
    const minutesAgo = Math.floor(seconds / minute);
    return `${minutesAgo} 分钟前`;
  } else if (seconds < day) {
    const hoursAgo = Math.floor(seconds / hour);
    return `${hoursAgo} 小时前`;
  } else if (seconds < week) {
    const daysAgo = Math.floor(seconds / day);
    return `${daysAgo} 天前`;
  } else {
    // 如果时间差大于一周，则显示具体日期
    const formattedDate = date.toLocaleDateString('en-US');
    return formattedDate;
  }
};
