'use client';
import React from 'react';
import MessageItem from '../messageItem';
import ListSearch from '@/app/components/public/ListSearch';

const SideNav: React.FC = () => {
  return (
    <div className="dark:bg-black bg-gray-50">
      <ListSearch />
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
