import { ChatType, MessageEnum } from '@/app/types/enmu';
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
