import { ChatType, MessageEnum } from '@/app/types/enmu';
import { IUser } from '@/app/types/user';

/**
 * 当前用户聊天列表
 */
export interface IMessageList {
  id: number;
  friendMsgNumber: null;
  userMsgNumber: null;
  msgType: string;
  updateTime: string;
  state: string;
  newMessage: string;
  fromUserId: number;
  toUserId: number;
  groupId: null;
  formUserName: string;
  formUserHeaderImg: string;
  formUserNickname: null;
  toUserName: string;
  toUserHeaderImg: string;
  toUserNickname: string;
  toUsersName: null;
}
