import React from 'react';
import { LogoutOutlined, MessageOutlined, SunOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Link from 'next/link';
import './index.scss';

const SideNav: React.FC = () => {
  return (
    <div className="dark:bg-black w-20 bg-mainBackground h-full overflow-hidden flex flex-col justify-between pb-3">
      <div>
        <div className="text-center pt-5">
          <Avatar size="large" icon={<UserOutlined />} />
        </div>

        <ul className="text-center text-zinc-500 text-xl mt-10" id="sideNav">
          <Link href="/dashboard/chatRoom">
            <li className="h-14  w-full flex items-center justify-center ">
              <div className="active h-full bg-mainForeground w-1 absolute left-0 hidden"></div>
              <MessageOutlined />
            </li>
          </Link>
          <Link href="/dashboard/friend">
            <li className="h-14  w-full  flex items-center justify-center">
              <div className="active h-full bg-mainForeground w-1 absolute left-0 hidden"></div>
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
        <li className="flex flex-col items-center">
          <LogoutOutlined />
          <span className="text-xs">Sign Out</span>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
