/**
 * 模块名:JWT
 */

import { http } from '../server';
import { IUser } from '@/app/types/user';

// 登录
export function login(data: { name: string; password: string }) {
  return http.post<{
    userInfo: IUser;
    token: string;
    refreshToken: string;
  }>('/auth/login', data);
}

// 注册

export function register(data: { name: string; password: string }) {
  return http.post<{
    userInfo: IUser;
  }>('/auth/register', data);
}

export default {
  login,
  register,
};
