import { EditOutlined, FormOutlined, LikeFilled, ManOutlined, WomanOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const UserDetail = () => {
  return (
    <div className="w-5/12   m-auto mt-52">
      {/* 头像 */}
      <div className="p-3  flex items-center justify-between">
        <div className="flex">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="rounded-full bg-gray-500 w-20 h-20 mr-3"
          />
          <div>
            <p className="pt-2">似懂非懂</p>
            <p className="pt-1 text-gray-400 text-sm">似懂非懂</p>
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
            <ManOutlined className="text-blue-400" />
            <WomanOutlined className="text-pink-400" />男
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
        <Button type="primary" className="w-28">
          发送
        </Button>
      </div>
    </div>
  );
};

export default UserDetail;
