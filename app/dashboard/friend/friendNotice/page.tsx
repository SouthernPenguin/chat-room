'use client';
import { Button, Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { agreeVerification, awaitFriends, IAwaitFriendsReturn } from '@/app/lib/api/friend';
import { toLocalTime } from '@/app/utils';

const FriendNotice = () => {
  const [awaitList, setAwaitList] = useState<IAwaitFriendsReturn[]>();

  const getAwaitFriends = async () => {
    const res = await awaitFriends();
    if (res.success) {
      setAwaitList([...res.data.content]);
    }
  };
  useEffect(() => {
    getAwaitFriends();
  }, []);

  // 通过
  const agreeWith = async (item: IAwaitFriendsReturn) => {
    const res = await agreeVerification(item.id);
    if (res.success) {
      await getAwaitFriends();
    }
  };

  return (
    <div className="  h-full dark:bg-black bg-gray-50">
      <div className="pt-4 pl-2 pr-2 text-center dark:text-white h-10 border-b-2 w-full border-gray-200 box-content">
        好友通知
      </div>

      <div className="w-full" style={{ height: 'calc(100% - 2.5rem)' }}>
        <ul className="pt-5">
          {!awaitList?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          {awaitList?.length &&
            awaitList.map(item => {
              return (
                <li
                  key={item.id}
                  className="flex   items-center h-16  m-auto w-1/2 bg-white dark:bg-black  border-all rounded-md shadow-lg box-content p-2"
                >
                  <div className="flex-none">
                    <img src={item.fromUser?.headerImg} className="rounded-full  w-12 h-12 mr-3" alt="无图片" />
                  </div>
                  <div className="grow text-sm">
                    <p className="mb-2">
                      <span className="text-sky-500 mr-1">{item.fromUser.name}</span>
                      <span className="text-slate-600">{toLocalTime(item.createdTime)}</span>
                    </p>
                    <p className="text-slate-600">留言：{item.notes}</p>
                  </div>
                  <div className="flex-none">
                    <Button onClick={() => agreeWith(item)}>同意</Button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default FriendNotice;
