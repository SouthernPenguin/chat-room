/**
 * 群聊模块
 */

import qs from 'qs';
import { http } from '../server';
import { ReturnListInterface, SearchPageInterface } from '@/app/types/publiceType';
import {
  IChatMessageHistoryList,
  ICreatGroupChat,
  ICreatGroupChatGroupReturn,
  IManyToManySendMessage,
  IRevokeMessage,
  ISelectGroupChat,
} from '@/app/types/groupChat';
import { IUser } from '@/app/types/user';

export const creatGroupChat = (data: ICreatGroupChat) =>
  http.post<ReturnListInterface<ICreatGroupChatGroupReturn>>('/group-chat', data);

// 当前用户聊天群
export const groupChatList = () => http.get<ReturnListInterface<ISelectGroupChat[]>>('/group-chat');

// 群聊记录
export const groupChatHistory = (id: number, params: SearchPageInterface) =>
  http.get<ReturnListInterface<IChatMessageHistoryList[]>>(`/group-message/${id}/?${qs.stringify(params)}`);

// 发生群聊天
export const sendMessage = (data: IManyToManySendMessage) => http.post('/group-message', data);

// 群消息撤回
export const revokeMessage = (data: IRevokeMessage) => http.post('/group-message/backMsg', data);

// 群成员
export const getGroupUsers = (id: number) => http.get<ReturnListInterface<IUser[]>>('/group-chat/' + id);

export default {
  creatGroupChat,
  groupChatList,
  groupChatHistory,
  sendMessage,
};
