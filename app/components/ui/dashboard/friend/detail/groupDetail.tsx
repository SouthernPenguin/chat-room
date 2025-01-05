import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { NotificationOutlined, ProfileOutlined, TeamOutlined, FormOutlined } from '@ant-design/icons';
import useUserStore from '@/app/store/user';
const GroupDetail = () => {
  const router = useRouter();
  const { selectUserInfo } = useUserStore();

  const toChat = () => {
    router.push(`/dashboard/chatRoom/groupChatRoom/${selectUserInfo.id}`);
  };

  return (
    <div className="w-5/12  m-auto mt-52">
      {/* 头像 */}
      <div className="p-3  flex  ">
        <p className="pt-2">群名：{selectUserInfo.name}</p>
      </div>

      <div className="p-2   flex items-center justify-between">
        <div>
          <FormOutlined />
          <span className="ml-2">备注</span>
        </div>
        <div>1</div>
      </div>

      <div className="p-2   flex items-center justify-between">
        <div>
          <span>
            <ProfileOutlined />
          </span>
          <span className="ml-2">群介绍</span>
        </div>
        <div>1</div>
      </div>

      <div className="p-2   flex items-center justify-between">
        <div>
          <span>
            <NotificationOutlined />
          </span>
          <span className="ml-2">群公告</span>
        </div>
        <div>1</div>
      </div>

      <div className="p-2">
        <p className="mb-1">
          <TeamOutlined />
          群成员（{selectUserInfo.headerImages && selectUserInfo.headerImages.length} 人）
        </p>
        <div className="flex">
          {selectUserInfo.headerImages &&
            selectUserInfo.headerImages.length &&
            selectUserInfo?.headerImages.map((src: string, index: number) => {
              return <img key={index} src={src} className="rounded-full bg-gray-500 w-7 h-7 mr-3" alt="无图片" />;
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
