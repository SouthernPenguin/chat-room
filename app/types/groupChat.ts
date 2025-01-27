import { ILogin } from '@/app/lib/api/login';
import { MessageEnum } from '@/app/lib/type/enmu';
import { IOneByOneSendMessage } from '@/app/lib/api/message';

// 当前用户聊天群
export interface ISelectGroupChat {
  id: number;
  name: string;
  notice?: null;
  createdUserId: number;
}

// 创建群聊
export interface ICreatGroupChat {
  name: string;
  userIds: number[];
}

export interface ICreatGroupChatGroupReturn {
  id: number;
  name: string;
  notice: string | null;
  users: ILogin[];
  createdUserId: ILogin;
}

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

// 发生群聊天
export interface IManyToManySendMessage extends Omit<IOneByOneSendMessage, 'toUserId'> {
  groupId: number;
}

// 群消息撤回
export interface IRevokeMessage {
  id: number;
  groupId: number;
}
