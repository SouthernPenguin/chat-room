import React from 'react';
import './index.scss';
import { Badge } from 'antd';
import Link from 'next/link';
import { IMessageList } from '@/app/lib/api/notice';
import useUserStore from '@/app/store/user';
import { ILogin } from '@/app/lib/api/login';
import { calcDate } from '@/app/utils';

interface IProps {
  id: number;
  userItem: IMessageList;
}
const MessageItem = (props: IProps) => {
  const { user } = useUserStore();

  const toUser: ILogin | number =
    user.id !== props.userItem.toUser.id ? props.userItem.toUser : props.userItem.fromUser;

  return (
    <Link href={'/dashboard/chatRoom/' + toUser.id}>
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
};

export default MessageItem;
