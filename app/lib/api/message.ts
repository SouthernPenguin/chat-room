/**
 * 私聊
 */
import qs from 'qs';
import { http } from '../server';
import { MessageEnum } from '@/app/lib/type/enmu';
import { ReturnListInterface } from '@/app/lib/type/publiceType';
import type { InternalAxiosRequestConfig } from 'axios';
import { IUser } from '@/app/types/user';
import { IMessageHistory, IMessageHistoryList, IOneByOneSendMessage } from '@/app/types/message';

/**
 * 发送消息
 */
export const sendMessage = (data: IOneByOneSendMessage) => http.post('/message', data);

/**
 * 双方聊天记录
 */

export const messageHistoryList = (query: IMessageHistory) =>
  http.get<ReturnListInterface<IMessageHistoryList[]>>('/message?' + qs.stringify(query));

/**
 * 撤销
 */
export const revokeMessage = (id: number, data: { toUserId: number }) => http.post(`/message/${id}`, data);

/**
 * 删除
 */
export const deleteMessage = (id: number, toUserId: number) =>
  http.delete(`/message/${id}`, {
    data: { toUserId },
  } as InternalAxiosRequestConfig);

export default {
  sendMessage,
  deleteMessage,
  messageHistoryList,
  revokeMessage,
};
