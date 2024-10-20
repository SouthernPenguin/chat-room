'use client';
import { Badge, Segmented } from 'antd';
import React, { useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import ListSearch from '@/app/components/public/ListSearch';
import UserItem from '../userItem';
import './index.scss';
import useSocket from '@/app/store/socketStore';

const SideNav = () => {
  const [segmentedValue, setSegmentedValue] = useState<string>('好友');
  const { awaitFriendsNumber } = useSocket();

  return (
    <div className="dark:bg-black bg-gray-50" id="friend-sideNav">
      {/* 搜索 */}
      <ListSearch />

      <div className="w-80 ">
        <Link href="/dashboard/friend/friendNotice">
          <div className="notify h-10 pl-3 pr-8 dark:text-white flex justify-between">
            <div>
              <span className="mr-3">好友通知</span>
              <Badge count={awaitFriendsNumber} showZero={false}></Badge>
            </div>
            <RightOutlined />
          </div>
        </Link>

        <Link href="/dashboard/friend/groupNotice">
          <div className="notify h-10 pl-3 pr-8 dark:text-white flex  justify-between">
            <span>群通知</span>
            <RightOutlined />
          </div>
        </Link>
      </div>

      {/* 好友 群聊 */}
      <div className="w-full p-3 ">
        <Segmented
          defaultValue="center"
          options={['好友', '群聊']}
          style={{ marginBottom: 8 }}
          block
          value={segmentedValue}
          onChange={setSegmentedValue}
        />
      </div>

      <div style={{ height: 'calc(100% - 5rem - 4rem - 3.5rem)' }} className="overflow-y-scroll p-3 ">
        {segmentedValue === '好友' && (
          <div>
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
            <UserItem userOrGroup={false} />
          </div>
        )}
        {segmentedValue === '群聊' && (
          <div>
            <UserItem userOrGroup={true} />
            <UserItem userOrGroup={true} />
            <UserItem userOrGroup={true} />
            <UserItem userOrGroup={true} />
            <UserItem userOrGroup={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;
