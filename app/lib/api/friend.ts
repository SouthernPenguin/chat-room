/**
 * 模块名: 好友关系
 */
import { http } from '../server';
import { ILogin } from './login';

export const getFiends = () => http.get<ILogin[]>('/friend-ship/list');

export default {
  getFiends,
};
