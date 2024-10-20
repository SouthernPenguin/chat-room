/**
 * 模块名:JWT
 */

import { http } from '../server';

// 登录
export interface ILogin {
  id: number;
  name: string;
  nickname: string | null;
  headerImg: string | undefined;
  gender: number | null;
}
export function login(data: { name: string; password: string }) {
  return http.post<{
    userInfo: ILogin;
    token: string;
    refreshToken: string;
  }>('/auth/login', data);
}

// 注册

export function register(data: { name: string; password: string }) {
  return http.post<{
    userInfo: ILogin;
  }>('/auth/register', data);
}

export default {
  login,
  register,
};
