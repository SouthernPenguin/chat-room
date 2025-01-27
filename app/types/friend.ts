import { SearchPageInterface } from '@/app/types/publiceType';
import { FriendShipEnum } from '@/app/types/enmu';
import { IUser } from '@/app/types/user';

// 查找好友
export interface IFriendList extends SearchPageInterface {
  name: string;
}

// 添加好友
export interface IAddFriend {
  friendId: number;
  fromUserId: number;
  notes: string;
}

export interface IAddFriendReturn extends IAddFriend {
  userId: number;
  sortedKey: string;
  userMsgNumber: null;
  friendMsgNumber: null;
  createdTime: string;
  id: number;
  state: FriendShipEnum;
}
// 等待通过好友验证列表
export interface IAwaitFriendsReturn extends IAddFriendReturn {
  fromUser: IUser;
}
