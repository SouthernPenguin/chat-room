/**
 * 模块名: 好友关系
 */
import qs from 'qs';
import { http } from '../server';
import { ReturnListInterface, SearchPageInterface } from '../type/publiceType';
import { FriendShipEnum } from '../type/enmu';
import { IUser } from '@/app/types/user';

// 好友列表
export const friendList = () => http.get<ReturnListInterface<IUser[]>>('/friend-ship/list');

// 查找好友
interface IFriendList extends SearchPageInterface {
  name: string;
}
export const findFriend = (params: IFriendList) =>
  http.get<ReturnListInterface<IUser[]>>('/friend-ship?' + qs.stringify(params));

// 添加好友
interface IAddFriend {
  friendId: number;
  fromUserId: number;
  notes: string;
}
interface IAddFriendReturn extends IAddFriend {
  userId: number;
  sortedKey: string;
  userMsgNumber: null;
  friendMsgNumber: null;
  createdTime: string;
  id: number;
  state: FriendShipEnum;
}
export const addFriend = (data: IAddFriend) => http.post<ReturnListInterface<IAddFriendReturn>>('/friend-ship', data);

// 等待通过好友验证列表
export interface IAwaitFriendsReturn extends IAddFriendReturn {
  fromUser: IUser;
}
export const awaitFriends = () => http.get<ReturnListInterface<IAwaitFriendsReturn[]>>('/friend-ship/awaitFriend');

// 通过好友验证
export const agreeVerification = (id: number) =>
  http.patch<ReturnListInterface<IAwaitFriendsReturn>>(`/friend-ship/${id}`);

export default {
  agreeVerification,
  awaitFriends,
  findFriend,
  addFriend,
  friendList,
};
