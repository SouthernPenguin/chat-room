/**
 * 群聊模块
 */

import qs from 'qs';
import { http } from '../server';
import { ILogin } from '@/app/lib/api/login';
import { ReturnListInterface } from '@/app/lib/type/publiceType';

// 创建群聊
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

// 当前用户聊天群
export interface IGroupChatList {
  id: number;
  name: string;
  users: ILogin[];
}
export const groupChatList = () => http.get<ReturnListInterface<IGroupChatList[]>>('/group-chat');

export default {
  creatGroupChat,
  groupChatList,
};
