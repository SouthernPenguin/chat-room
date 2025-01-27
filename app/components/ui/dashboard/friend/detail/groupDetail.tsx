import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { NotificationOutlined, ProfileOutlined, TeamOutlined, FormOutlined } from '@ant-design/icons';
import useUserStore from '@/app/store/user';
import { getGroupUsers } from '@/app/lib/api/groupChat';
import { IUser } from '@/app/types/user';
const GroupDetail = () => {
  const router = useRouter();
  const { selectGroupInfo } = useUserStore();
  const [users, setUsers] = useState<IUser[]>([]);

  const toChat = () => {
    router.push(`/dashboard/chatRoom/groupChatRoom/${selectGroupInfo.id}`);
  };

  useEffect(() => {
    if (selectGroupInfo.id > 0) {
      getGroupDetail(selectGroupInfo.id);
    }
  }, [selectGroupInfo]);

  const getGroupDetail = async (id: number) => {
    const res = await getGroupUsers(id);
    if (res.success) {
      setUsers([...res.data.content]);
    }
  };

  return (
    <div className="w-5/12  m-auto mt-52">
      {/* 头像 */}
      <div className="p-3  flex  ">
        <p className="pt-2">群名：{selectGroupInfo.name}</p>
      </div>

      <div className="p-2   flex items-center justify-between">
        <div>
          <FormOutlined />
          <span className="ml-2">备注</span>
        </div>
        <div>{selectGroupInfo.notice}</div>
      </div>

      <div className="p-2   flex items-center justify-between">
        <div>
          <span>
            <ProfileOutlined />
          </span>
          <span className="ml-2">群介绍</span>
        </div>
        <div>{selectGroupInfo.notice}</div>
      </div>

      <div className="p-2   flex items-center justify-between">
        <div>
          <span>
            <NotificationOutlined />
          </span>
          <span className="ml-2">群公告</span>
        </div>
        <div>{selectGroupInfo.notice}</div>
      </div>

      <div className="p-2">
        <p className="mb-1">
          <TeamOutlined />
          群成员（{users.length} 人）
        </p>
        <div className="flex">
          {users.length &&
            users.map((item: IUser) => {
              return (
                <img
                  key={item.id}
                  src={item.headerImg}
                  className="rounded-full bg-gray-500 w-7 h-7 mr-3"
                  alt="无图片"
                />
              );
            })}
        </div>
      </div>

      <div className="p-2 text-center">
        <Button type="primary" className="w-28" onClick={toChat}>
          发送
        </Button>
      </div>
    </div>
  );
};

export default GroupDetail;
