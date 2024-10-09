'use client';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import React, { useState } from 'react';
import FindFriend from '../FindFriend';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '添加好友',
  },
  {
    key: '2',
    label: '发起群聊',
  },
];

const ListSearch = () => {
  const [show, setShow] = useState<boolean>(false);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      setShow(true);
    }
  };
  return (
    <>
      <div className="pt-4 pl-2 pr-2 text-center border-b-2 border-gray-200 box-content flex">
        <input
          type="text"
          className="w-full block rounded-3xl h-8 bg-gray-200 dark:bg-black dark:text-white pl-5 pr-5 mb-2 mr-1"
          placeholder="回车搜索"
        />
        <Dropdown menu={{ items, onClick }} placement="bottom">
          <Button icon={<PlusOutlined />} />
        </Dropdown>
      </div>

      <FindFriend show={show} closeOpen={() => setShow(false)} />
    </>
  );
};

export default ListSearch;
