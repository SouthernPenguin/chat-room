import { http } from '@/app/lib/server';
import { ReturnListInterface } from '@/app/lib/type/publiceType';
import { IMessageList } from '@/app/types/notice';

/**
 * 当前用户聊天列表
 */
export const messageList = () => http.get<ReturnListInterface<IMessageList[]>>('/notice');

export default {
  messageList,
};
