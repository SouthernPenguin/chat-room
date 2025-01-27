import { ChatType, MessageEnum } from '@/app/types/enmu';
import { IUser } from '@/app/types/user';

/**
 * 发送消息
 */
export interface IOneByOneSendMessage {
  postMessage: string;
  toUserId: number; // 接收者id
  msgType: ChatType;
}
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
  originalFileName: string;
  state: MessageEnum;
  toUser: IUser;
}
