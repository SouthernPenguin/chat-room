import React from 'react';
import { deleteMessage, IMessageHistoryList } from '@/app/lib/api/message';
import { toLocalTime } from '@/app/utils';
import { Dropdown, MenuProps, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { ISelectUserInfo } from '@/app/store/user';

export interface IProps {
  item: IMessageHistoryList;
  user: ISelectUserInfo;
}

const items: MenuProps['items'] = [
  {
    label: '复制',
    key: '1',
    icon: <CopyOutlined />,
  },
  // {
  //   label: '删除',
  //   key: '2',
  //   icon: <DeleteOutlined />,
  // },
];

const CounterpartMessage = (props: IProps) => {
  const { item, user } = props;

  const onClick: MenuProps['onClick'] = async ({ key }) => {
    if (key === '1') {
      try {
        await navigator.clipboard.writeText(item.postMessage);
        message.success('复制成功');
      } catch (e) {
        message.error('复制失败' + e);
      }
    }
    if (key === '2') {
      try {
        await deleteMessage(item.id, item.toUserId);
      } catch {
        // todo
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex max-w-[40%]">
        <img src={user.headerImg} className="rounded-full bg-gray-500 w-9 h-9 mr-3" alt="无图片" />
        <div>
          <Dropdown menu={{ items, onClick }} trigger={['contextMenu']}>
            <div
              className="bg-white rounded-r-3xl rounded-bl-3xl p-2 w-screen-md shadow-lg  dark:bg-mainBackground dark:text-white mb-1"
              style={{ wordBreak: 'break-all' }}
            >
              {item.postMessage}
            </div>
          </Dropdown>
          <div className="text-gray-500 dark:text-white text-xs">{toLocalTime(item.createdTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default CounterpartMessage;
