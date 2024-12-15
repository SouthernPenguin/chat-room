import axios from 'axios';

/**
 * 下载文件
 * @param pathUrl
 */
export const downFiles = (pathUrl: string) =>
  axios.get(pathUrl, {
    responseType: 'blob',
  });
