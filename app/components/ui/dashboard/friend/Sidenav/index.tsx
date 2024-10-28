'use client';
import { Badge, Segmented } from 'antd';
import React, { useEffect, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import ListSearch from '@/app/components/public/ListSearch';
import UserItem from '../userItem';
import './index.scss';
import useSocket from '@/app/store/socketStore';
import { friendList } from '@/app/lib/api/friend';
import { ILogin } from '@/app/lib/api/login';
import { groupChatList, IGroupChatList } from '@/app/lib/api/groupChat';

const SideNav = () => {
  const [segmentedValue, setSegmentedValue] = useState<string>('好友');
  const [list, setList] = useState<ILogin[]>([]);
  const [groupList, setGroupList] = useState<IGroupChatList[]>([]);
  const { awaitFriendsNumber } = useSocket();

  useEffect(() => {
    getFriendList();
    getGroupChatList();
  }, []);

  const getFriendList = async () => {
    const res = await friendList();
    if (res.success) {
      setList([...res.data.content]);
    }
  };

  const getGroupChatList = async () => {
    const res = await groupChatList();
    if (res.success) {
      setGroupList([...res.data.content]);
    }
  };

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
            {list.length &&
              list.map(item => {
                return (
                  <Link href="/dashboard/friend" key={item.id}>
                    <UserItem userOrGroup={false} userItem={item} />
                  </Link>
                );
              })}
          </div>
        )}

        {segmentedValue === '群聊' && (
          <div>
            {groupList.length &&
              groupList.map(item => {
                return (
                  <Link href="/dashboard/friend" key={item.id}>
                    <UserItem
                      userOrGroup={true}
                      groupItem={{
                        name: item.name,
                        headerImages: item.users.map(value => value.headerImg).splice(0, 8) as string[],
                      }}
                    />
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNav;
