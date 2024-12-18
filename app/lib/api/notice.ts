import { http } from '@/app/lib/server';
import { ILogin } from '@/app/lib/api/login';
import { ChatType, MessageEnum } from '@/app/lib/type/enmu';
import { ReturnListInterface } from '@/app/lib/type/publiceType';

/**
 * 当前用户聊天列表
 */
export interface IMessageList {
  id: number;
  friendMsgNumber: number;
  userMsgNumber: number;
  msgType: ChatType;
  updateTime: string;
  state: MessageEnum;
  newMessage: MessageEnum;
  fromUserId: number;
  toUserId: number;
  groupId: number;
  toUser: ILogin;
  fromUser: ILogin;
  toUsers: number;
}
export const messageList = () => http.get<ReturnListInterface<IMessageList[]>>('/notice');

export default {
  messageList,
};
