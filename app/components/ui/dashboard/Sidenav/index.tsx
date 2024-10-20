'use client';
import React, { useEffect } from 'react';
import { LogoutOutlined, MessageOutlined, SunOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge } from 'antd';
import Link from 'next/link';
import './index.scss';
import { signOut } from 'next-auth/react';
import useSocket from '@/app/store/socketStore';
import socket from '@/app/utils/socket/socket';
import { IAwaitFriendsReturn } from '@/app/lib/api/friend';
import { ReturnListInterface } from '@/app/lib/type/publiceType';
import { FriendShipEnum } from '@/app/lib/type/enmu';
import { AwaitFriend } from '@/app/utils/socket';

const SideNav: React.FC = () => {
  const { awaitFriendsNumber, setAwaitFriendsNumber } = useSocket();

  useEffect(() => {
    function onAwaitFriend(res: ReturnListInterface<IAwaitFriendsReturn[]>) {
      if (res.content.length) {
        setAwaitFriendsNumber(res.content.filter(item => item.state === FriendShipEnum.发起).length);
      }
    }
    socket.on(AwaitFriend, onAwaitFriend);

    return () => {
      socket.off(AwaitFriend, onAwaitFriend);
    };
  }, []);

  return (
    <div className="dark:bg-black w-20 bg-mainBackground h-full overflow-hidden flex flex-col justify-between pb-3">
      <div>
        <div className="text-center pt-5">
          <Avatar size="large" icon={<UserOutlined />} />
        </div>

        <ul className="text-center text-zinc-500 text-xl mt-10" id="sideNav">
          {/*聊天相关*/}
          <Link href="/dashboard/chatRoom">
            <li className="h-14  w-full flex items-center justify-center ">
              <div className="active h-full bg-mainForeground w-1 absolute left-0 hidden"></div>
              <MessageOutlined />
            </li>
          </Link>
          {/*用户相关*/}
          <Link href="/dashboard/friend">
            <li className="h-14  w-full  flex items-center justify-center">
              <div className="active h-full bg-mainForeground w-1 absolute left-0 hidden"></div>
              <Badge
                count={awaitFriendsNumber}
                showZero={false}
                className="absolute top-3 right-5"
                size="small"
              ></Badge>
              <TeamOutlined />
            </li>
          </Link>
        </ul>
      </div>

      {/* 工具 */}
      <ul className="text-center text-zinc-500" id="sideNav">
        <li className="text-xl mb-3">
          <SunOutlined />
        </li>
        <li className="flex flex-col items-center" onClick={() => signOut({ callbackUrl: '/signin' })}>
          <LogoutOutlined />
          <span className="text-xs">Sign Out</span>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
