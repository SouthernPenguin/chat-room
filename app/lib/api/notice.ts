import { http } from '@/app/lib/server';
import { ChatType, MessageEnum } from '@/app/lib/type/enmu';
import { ReturnListInterface } from '@/app/lib/type/publiceType';
import { IUser } from '@/app/types/user';

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
  toUser: IUser;
  fromUser: IUser;
  toUsers: {
    id: number;
    name: string;
    notice: string;
  };
}
export const messageList = () => http.get<ReturnListInterface<IMessageList[]>>('/notice');

export default {
  messageList,
};
