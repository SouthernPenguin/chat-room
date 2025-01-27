'use client';
import React, { useEffect, useState } from 'react';
import MessageItem from '../messageItem';
import ListSearch from '@/app/components/public/ListSearch';
import { IMessageList, messageList } from '@/app/lib/api/notice';
import socket from '@/app/utils/socket/socket';
import { ActiveUserNoticeList } from '@/app/utils/socket';

const SideNav: React.FC = () => {
  const [userMessageList, setUserMessageList] = useState<IMessageList[]>([]);

  useEffect(() => {
    getMessageList();
  }, []);

  useEffect(() => {
    function onActiveUserNoticeList(res: IMessageList[]) {
      setUserMessageList([...res]);
    }

    socket.on(ActiveUserNoticeList, onActiveUserNoticeList);

    return () => {
      socket.off(ActiveUserNoticeList, onActiveUserNoticeList);
    };
  }, []);

  const getMessageList = async () => {
    const res = await messageList();
    if (res.success) {
      setUserMessageList(res.data.content);
    }
  };

  return (
    <div className="dark:bg-black bg-gray-50">
      {/*搜索 添加*/}
      <ListSearch />
      <div className="p-2  w-80 flex-none overflow-y-scroll" style={{ height: 'calc(100% - 2rem - 2rem)' }}>
        {userMessageList &&
          userMessageList.length &&
          userMessageList.map((item: IMessageList) => {
            return <MessageItem id={item.id} userItem={item} key={item.id} />;
          })}
      </div>
    </div>
  );
};
export default SideNav;
