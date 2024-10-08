'use client';
import { Button } from 'antd';
import React from 'react';

const GroupNotice = () => {
  return <div className="  h-full dark:bg-black bg-gray-50">
    <div className="pt-4 pl-2 pr-2 text-center dark:text-white h-10 border-b-2 w-full border-gray-200 box-content">
      群通知
    </div>
    <div className='w-full' style={{ height: 'calc(100% - 2.5rem)' }}>
      <ul className='pt-5'>
        <li className='flex   items-center h-16  m-auto w-1/2 bg-white dark:bg-black  border-all rounded-md shadow-lg box-content p-2'>
          <div className='flex-none'>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="rounded-full  w-12 h-12 mr-3" />
          </div>
          <div className='grow text-sm'>
            <p className='mb-2'><span className='text-sky-500 mr-1'>昵称</span><span  className='text-slate-600'>2024/8/8</span></p>
            <p className='text-slate-600'>留言：</p>
          </div>
          <div className='flex-none'>
            <Button  >同意</Button>
          </div>
        </li>
      </ul>
    </div>
  </div>
};

export default GroupNotice;
