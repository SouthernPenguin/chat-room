import React from 'react';
import { toLocalTime } from '@/app/utils';
import { IMessageHistoryList, revokeMessage, deleteMessage } from '@/app/lib/api/message';
import { ILogin } from '@/app/lib/api/login';
import { Dropdown, MenuProps, message, Image } from 'antd';
import { CopyOutlined, RollbackOutlined } from '@ant-design/icons';
import { AllowedImageTypes } from '@/app/utils/constant';

export interface IProps {
  item: IMessageHistoryList;
  user: ILogin;
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
  {
    label: '撤销',
    key: '3',
    icon: <RollbackOutlined />,
  },
];

const MyselfMessage = (props: IProps) => {
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
      } catch (e) {
        console.log(e);
      }
    }
    if (key === '3') {
      try {
        await revokeMessage(item.id, { toUserId: item.toUserId });
      } catch {
        // todo
      }
    }
  };

  const messageEl = (item: IMessageHistoryList) => {
    if (item.fileType == null) {
      return item.postMessage;
    }
    if (AllowedImageTypes.includes(item.fileType)) {
      return <Image width={200} src={item.postMessage} />;
    }
  };

  return (
    <div className="w-full flex justify-end mb-2">
      <div className="flex max-w-[40%]">
        <div>
          <Dropdown menu={{ items, onClick }} trigger={['contextMenu']}>
            <div
              className="bg-mainForeground rounded-l-3xl rounded-br-3xl p-2 w-screen-md shadow-lg dark:text-white mb-1"
              style={{ wordBreak: 'break-all' }}
            >
              {messageEl(item)}
            </div>
          </Dropdown>
          <div className="text-right text-gray-500 dark:text-white text-xs">{toLocalTime(item.createdTime)}</div>
        </div>
        <img src={user.headerImg} className="rounded-full bg-gray-500 w-9 h-9 ml-3" alt="无图片" />
      </div>
    </div>
  );
};

export default MyselfMessage;
