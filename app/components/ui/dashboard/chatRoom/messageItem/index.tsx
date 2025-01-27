import React from 'react';
import './index.scss';
import Link from 'next/link';
import useUserStore from '@/app/store/user';
import { calcDate } from '@/app/utils';
import { ChatType } from '@/app/lib/type/enmu';
import { IUser } from '@/app/types/user';
import { IMessageList } from '@/app/types/notice';

interface IProps {
  id: number;
  userItem: IMessageList;
}
const MessageItem = (props: IProps) => {
  const { user } = useUserStore();

  if (props.userItem.msgType === ChatType.私聊) {
    const toUser: IUser = user.id !== props.userItem.toUser.id ? props.userItem.toUser : props.userItem.fromUser;
    return (
      <Link href={'/dashboard/chatRoom/singleChatRoom/' + toUser.id}>
        <div
          id="messageItem"
          className="w-full bg-white h-24 border-all rounded-md shadow-lg relative overflow-hidden dark:bg-black dark:text-white mb-3"
        >
          <div className="active h-full bg-mainForeground w-1 absolute left-0 hidden"></div>
          <div className="p-3 box-border">
            <div className="flex gap-x-2 mb-2 justify-between">
              <div className="flex  w-2/3">
                <img src={toUser.headerImg} className="rounded-full bg-gray-500 w-11 h-11 mr-3" />
                <div className="dark:text-white font-black text-ellipsis overflow-hidden ...">{toUser.name}</div>
              </div>

              <div className="dark:text-white text-sm" style={{ color: '#d3d3d3' }}>
                {calcDate(props.userItem.updateTime)}
              </div>
            </div>
            <div className="relative dark:text-white text-ellipsis overflow-hidden ... pr-7">
              <span>{props.userItem.newMessage}</span>
              {/*未读统计*/}
              {/*<Badge count={5} className="right-0 top-0 absolute"></Badge>*/}
            </div>
          </div>
        </div>
      </Link>
    );
  }
  if (props.userItem.msgType === ChatType.群聊) {
    return (
      <Link href={'/dashboard/chatRoom/groupChatRoom/' + props.userItem.toUsers.id}>
        <div
          id="messageItem"
          className="w-full bg-white h-24 border-all rounded-md shadow-lg relative overflow-hidden dark:bg-black dark:text-white mb-3"
        >
          <div className="active h-full bg-mainForeground w-1 absolute left-0 hidden"></div>
          <div className="p-3 box-border">
            <div className="flex gap-x-2 mb-2 justify-between">
              <div className="flex  w-2/3">
                {/*<img src={toUser.headerImg} className="rounded-full bg-gray-500 w-11 h-11 mr-3" />*/}
                <div className="dark:text-white font-black text-ellipsis overflow-hidden ...">
                  {props.userItem.toUsers.name}
                </div>
              </div>

              <div className="dark:text-white text-sm" style={{ color: '#d3d3d3' }}>
                {calcDate(props.userItem.updateTime)}
              </div>
            </div>
            <div className="relative dark:text-white text-ellipsis overflow-hidden ... pr-7">
              <span>{props.userItem.newMessage}</span>
              {/*未读统计*/}
              {/*<Badge count={5} className="right-0 top-0 absolute"></Badge>*/}
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default MessageItem;
