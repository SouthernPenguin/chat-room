import React from 'react';
import { Button } from 'antd';
import { NotificationOutlined, ProfileOutlined, TeamOutlined, FormOutlined } from '@ant-design/icons';
const GroupDetail = () => {
  return (
    <div className="w-5/12  m-auto mt-52">
      {/* 头像 */}
      <div className="p-3  flex  ">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="rounded-full bg-gray-500 w-20 h-20 mr-3"
        />

        <p className="pt-2">似懂非懂</p>
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
          群成员（132132人）
        </p>
        <div className="flex">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="rounded-full bg-gray-500 w-7 h-7 mr-3"
          />
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="rounded-full bg-gray-500 w-7 h-7 mr-3"
          />
        </div>
      </div>

      <div className="p-2 text-center">
        <Button type="primary" className="w-28">
          发送
        </Button>
      </div>
    </div>
  );
};

export default GroupDetail;
