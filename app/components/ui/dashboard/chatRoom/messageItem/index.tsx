import React from 'react';
import './index.scss';
import { Badge } from 'antd';
import Link from 'next/link';

const MessageItem = ({ id }) => {
  return (
    <Link href={'/dashboard/chatRoom/' + id}>
      <div
        id="messageItem"
        className="w-full bg-white h-24 border-all rounded-md shadow-lg relative overflow-hidden dark:bg-black dark:text-white mb-3"
      >
        <div className="active h-full bg-mainForeground w-1 absolute left-0 hidden"></div>
        <div className="p-3 box-border">
          <div className="flex gap-x-2 mb-2 justify-between">
            <div className="flex  w-2/3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="rounded-full bg-gray-500 w-11 h-11 mr-3"
              />
              <div className="dark:text-white font-black text-ellipsis overflow-hidden ...">
                fsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsf
              </div>
            </div>

            <div className="dark:text-white text-sm" style={{ color: '#d3d3d3' }}>
              4小时前
            </div>
          </div>
          <div className="relative dark:text-white text-ellipsis overflow-hidden ... pr-7">
            <span>2fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsd</span>
            <Badge count={5} className="right-0 top-0 absolute"></Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MessageItem;
