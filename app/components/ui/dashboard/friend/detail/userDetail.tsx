import { EditOutlined, FormOutlined, LikeFilled, ManOutlined, WomanOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import useUserStore from '@/app/store/user';
import { useRouter } from 'next/navigation';

const UserDetail = () => {
  const router = useRouter();
  const { selectUserInfo } = useUserStore();

  const toChat = () => {
    router.push(`/dashboard/chatRoom/singleChatRoom/${selectUserInfo.id}`);
  };
  return (
    <div className="w-5/12   m-auto mt-52">
      {/* 头像 */}
      <div className="p-3  flex items-center justify-between">
        <div className="flex">
          <img src={selectUserInfo.headerImg} alt="无图片" className="rounded-full bg-gray-500 w-20 h-20 mr-3" />
          <div>
            <p className="pt-2">{selectUserInfo.name}</p>
            <p className="pt-1 text-gray-400 text-sm">{selectUserInfo.nickname}</p>
          </div>
        </div>
        <div>
          46464
          <LikeFilled />
        </div>
      </div>

      {/* 个人基本消息 */}
      <div className="p-3 ">
        <ul className="flex">
          <li className="mr-5 text-sm">
            {selectUserInfo.gender === 1 && <ManOutlined className="text-blue-400" />}
            {selectUserInfo.gender === 2 && <WomanOutlined className="text-pink-400" />}
            {selectUserInfo.gender === 1 ? '男' : '女'}
          </li>
          <li className="mr-5 text-sm">26岁</li>
          <li className="mr-5 text-sm">8月20日 狮子座</li>
          <li className=" text-sm">现居地 浙江</li>
        </ul>
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
          <EditOutlined />
          <span className="ml-2">签名</span>
        </div>
        <div>1</div>
      </div>

      <div className="p-2 text-center">
        <Button type="primary" className="w-28" onClick={() => toChat()}>
          发送
        </Button>
      </div>
    </div>
  );
};

export default UserDetail;
