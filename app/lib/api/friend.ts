/**
 * 模块名: 好友关系
 */
import qs from 'qs';
import { http } from '../server';
import { ReturnListInterface, SearchPageInterface } from '../type/publiceType';
import { ILogin } from './login';

// 好友列表
export const friendList = () => http.get<ILogin[]>('/friend-ship/list');

// 查找好友
interface IFriendList extends SearchPageInterface {
  name: string;
}
export const findFriend = (params: IFriendList) =>
  http.get<ReturnListInterface<ILogin[]>>('/friend-ship?' + qs.stringify(params));

export default {
  findFriend,
  friendList,
};
