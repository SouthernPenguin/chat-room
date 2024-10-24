/**
 * 群聊模块
 */

import qs from 'qs';
import { http } from '../server';
import { ILogin } from '@/app/lib/api/login';
import { ReturnListInterface } from '@/app/lib/type/publiceType';

interface ICreatGroupChat {
  name: string;
  userIds: number[];
}
interface ICreatGroupChatGroupReturn {
  id: number;
  name: string;
  notice: string | null;
  users: ILogin[];
  createdUserId: ILogin;
}
export const creatGroupChat = (data: ICreatGroupChat) =>
  http.post<ReturnListInterface<ICreatGroupChatGroupReturn>>('/group-chat', data);

export default {
  creatGroupChat,
};
