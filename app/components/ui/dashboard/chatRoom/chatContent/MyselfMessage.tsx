import React, { useState } from 'react';
import { toLocalTime } from '@/app/utils';
import { IMessageHistoryList, revokeMessage } from '@/app/lib/api/message';
import { ILogin } from '@/app/lib/api/login';
import { Dropdown, MenuProps, message, Image } from 'antd';
import { CopyOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { AllowedOfficeTypes } from '@/app/utils/constant';
import { downFiles } from '@/app/lib/api/down';
import { useMessageEl } from './useMessageEl';

export interface IProps {
  item: IMessageHistoryList;
  user: ILogin;
}

const MyselfMessage = (props: IProps) => {
  const { item, user } = props;

  const [items, setItems] = useState<MenuProps['items']>([
    {
      label: '复制',
      key: '1',
      icon: <CopyOutlined />,
    },
    {
      label: '撤销',
      key: '2',
      icon: <RollbackOutlined />,
    },
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
    if (key === '2') {
      try {
        await revokeMessage(item.id, { toUserId: item.toUserId });
      } catch {
        // todo
      }
    }

    if (key === '3') {
      try {
        const response = await downFiles(item.postMessage);
        debugger;
        const downloadLink = document.createElement('a');
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = item.originalFileName.split('.')[0]; // 设置下载后的文件名
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadLink.href);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleRightClick = (item: IMessageHistoryList) => {
    if (!AllowedOfficeTypes.includes(item.fileType!)) {
      let copy = [...items!];
      setItems(copy.filter(item => item?.key !== '3'));
    }
  };

  return (
    <div className="w-full flex justify-end mb-2">
      <div className="flex max-w-[50%]">
        <div onContextMenu={() => handleRightClick(item)}>
          <Dropdown menu={{ items, onClick }} trigger={['contextMenu']}>
            <div
              className="bg-mainForeground rounded-l-3xl rounded-br-3xl p-2 w-screen-md shadow-lg dark:text-white mb-1"
              style={{ wordBreak: 'break-all' }}
            >
              {useMessageEl(item)}
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
