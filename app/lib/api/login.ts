/**
 * 模块名:JWT
 */

import { http } from '../server';

// 登录
export interface ILogin {
  id: number;
  name: string;
  nickname: string;
  headerImg: string;
  gender: number;
}
export function login(data: { name: string; password: string }) {
  return http.post<{
    userInfo: ILogin;
    token: string;
  }>('/auth/login', data);
}

// export default {
//   login,
// };
