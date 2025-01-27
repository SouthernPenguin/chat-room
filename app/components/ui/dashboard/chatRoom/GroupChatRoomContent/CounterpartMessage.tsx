import React, { useState } from 'react';
import { toLocalTime } from '@/app/utils';
import { Dropdown, MenuProps, message } from 'antd';
import { CopyOutlined, SaveOutlined } from '@ant-design/icons';
import { ISelectUserInfo } from '@/app/store/user';
import { useMessageEl } from './useMessageEl';
import { AllowedOfficeTypes } from '@/app/utils/constant';
import { IChatMessageHistoryList } from '@/app/types/groupChat';

export interface IProps {
  item: IChatMessageHistoryList;
  user: ISelectUserInfo;
}

const CounterpartMessage = (props: IProps) => {
  const { item, user } = props;

  const [items, setItems] = useState<MenuProps['items']>([
    {
      label: '复制',
      key: '1',
      icon: <CopyOutlined />,
    },
    // {
    //   label: '撤销',
    //   key: '2',
    //   icon: <RollbackOutlined />,
    // },
    {
      label: '另存为',
      key: '3',
      icon: <SaveOutlined />,
    },
  ]);

  const onClick: MenuProps['onClick'] = async ({ key }) => {
    if (key === '1') {
      try {
        await navigator.clipboard.writeText(item.postMessage);
        message.success('复制成功');
      } catch (e) {
        message.error('复制失败' + e);
      }
    }
  };

  const handleRightClick = (item: IChatMessageHistoryList) => {
    if (!AllowedOfficeTypes.includes(item.fileType!)) {
      const copy = [...items!];
      setItems(copy.filter(item => item?.key !== '3'));
    }
  };
  return (
    <div className="w-full">
      <div className="flex max-w-[50%]">
        <img src={item.fromUser.headerImg} className="rounded-full bg-gray-500 w-9 h-9 mr-3" alt="无图片" />
        <div onContextMenu={() => handleRightClick(item)}>
          <Dropdown menu={{ items, onClick }} trigger={['contextMenu']}>
            <div
              className="bg-white rounded-r-3xl rounded-bl-3xl p-2 w-screen-md shadow-lg  dark:bg-mainBackground dark:text-white mb-1"
              style={{ wordBreak: 'break-all' }}
            >
              {useMessageEl(item)}
            </div>
          </Dropdown>
          <div className="text-gray-500 dark:text-white text-xs">{toLocalTime(item.createdTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default CounterpartMessage;
