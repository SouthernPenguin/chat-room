/**
 * 模块名: 好友关系
 */
import qs from 'qs';
import { http } from '../server';
import { ReturnListInterface } from '../type/publiceType';
import { IUser } from '@/app/types/user';
import { IAddFriend, IAddFriendReturn, IAwaitFriendsReturn, IFriendList } from '@/app/types/friend';

// 好友列表
export const friendList = () => http.get<ReturnListInterface<IUser[]>>('/friend-ship/list');

// 查找好友
export const findFriend = (params: IFriendList) =>
  http.get<ReturnListInterface<IUser[]>>('/friend-ship?' + qs.stringify(params));

// 添加好友
export const addFriend = (data: IAddFriend) => http.post<ReturnListInterface<IAddFriendReturn>>('/friend-ship', data);

// 等待通过好友验证列表
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
