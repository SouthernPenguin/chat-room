'use client';
import React, { useEffect } from 'react';
import MessageItem from '../messageItem';

const SideNav: React.FC = () => {
  useEffect(() => {
    console.log('进入也吗');
  }, []);
  return (
    <div className="dark:bg-black bg-gray-50">
      <div className="pt-4 pl-2 pr-2 text-center border-b-2 border-gray-200 box-content">
        <input
          type="text"
          className="w-full block rounded-3xl h-8 bg-gray-100 dark:bg-black dark:text-white pl-5 pr-5 mb-2"
          placeholder="回车搜索"
        />
      </div>
      <div className="p-2  w-80 flex-none overflow-y-scroll" style={{ height: 'calc(100% - 2rem - 2rem)' }}>
        <MessageItem id={1} />
        <MessageItem id={2} />
        <MessageItem id={3} />
        <MessageItem id={4} />
        <MessageItem id={6} />
        <MessageItem id={6} />
        <MessageItem id={4} />
        <MessageItem id={4} />
        <MessageItem id={4} />
        <MessageItem id={4} />
        <MessageItem id={4} />
        <MessageItem id={4} />
        <MessageItem id={4} />
        <MessageItem id={6} />
        <MessageItem id={4} />
      </div>
    </div>
  );
};
export default SideNav;
