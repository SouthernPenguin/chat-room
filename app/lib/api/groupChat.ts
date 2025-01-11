/**
 * 群聊模块
 */

import qs from 'qs';
import { http } from '../server';
import { ILogin } from '@/app/lib/api/login';
import { ReturnListInterface, SearchPageInterface } from '@/app/lib/type/publiceType';
import { IOneByOneSendMessage } from '@/app/lib/api/message';
import { MessageEnum } from '@/app/lib/type/enmu';

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

// 群聊天记录
export interface IChatMessageHistoryList {
  createdTime: string;
  fileSize: null;
  fileType: null;
  fromUserId: number;
  fromUser: ILogin;
  groupId: number;
  id: number;
  postMessage: string;
  state: MessageEnum;
  originalFileName: string;
}
export const groupChatHistory = (id: number, params: SearchPageInterface) =>
  http.get<ReturnListInterface<IChatMessageHistoryList[]>>(`/group-message/${id}/?${qs.stringify(params)}`);

// 发生群聊天
export interface IManyToManySendMessage extends Omit<IOneByOneSendMessage, 'toUserId'> {
  groupId: number;
}
export const sendMessage = (data: IManyToManySendMessage) => http.post('/group-message', data);

// 群消息撤回
export interface IRevokeMessage {
  id: number;
  groupId: number;
}
export const revokeMessage = (data: IRevokeMessage) => http.post('/group-message/backMsg', data);

export default {
  creatGroupChat,
  groupChatList,
  groupChatHistory,
  sendMessage,
};
