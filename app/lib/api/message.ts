/**
 * 私聊
 */
import qs from 'qs';
import { http } from '../server';
import { ChatType, MessageEnum } from '@/app/lib/type/enmu';
import { ReturnListInterface } from '@/app/lib/type/publiceType';
import { ILogin } from '@/app/lib/api/login';
import type { InternalAxiosRequestConfig } from 'axios';

/**
 * 发送消息
 */
export interface IOneByOneSendMessage {
  postMessage: string;
  toUserId: number; // 接收者id
  msgType: ChatType;
}
export const sendMessage = (data: IOneByOneSendMessage) => http.post('/message', data);

/**
 * 双方聊天记录
 */
export interface IMessageHistory {
  toUserId: number;
  page: number;
  limit?: number;
}
export interface IMessageHistoryList {
  createdTime: string;
  fileSize: null;
  fileType: null;
  fromUserId: number;
  toUserId: number;
  id: number;
  postMessage: string;
  originalFileName:string;
  state: MessageEnum;
  toUser: ILogin;
}

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
