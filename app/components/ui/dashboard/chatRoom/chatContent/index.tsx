'use client';
import { PhoneOutlined, ToTopOutlined, VideoCameraOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useUserStore from '@/app/store/user';
import { IMessageHistoryList, messageHistoryList, sendMessage } from '@/app/lib/api/message';
import { ChatType } from '@/app/lib/type/enmu';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import MyselfMessage from './MyselfMessage';
import CounterpartMessage from '@/app/components/ui/dashboard/chatRoom/chatContent/CounterpartMessage';
import socket from '@/app/utils/socket/socket';
import { ActiveTowUsers } from '@/app/utils/socket';
import { Button, message, Upload, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getLocalStorage } from '@/app/utils';
import { chatUploadUrl } from '@/app/lib/api/upload';

const ChatContent: React.FC = () => {
  const { selectUserInfo, user } = useUserStore();
  const [messageHistory, setMessageHistory] = useState<IMessageHistoryList[]>([]);
  const [page, setPage] = useState<{ totalElements: number; totalPages: number }>({
    totalElements: -1,
    totalPages: -1,
  });
  const [msgPage, setMsgPage] = useState<number>(1);

  const params = useParams<Params>();

  const [textareaValue, setTextareaValue] = useState<string>('');

  const send = async () => {
    const res = await sendMessage({
      postMessage: textareaValue,
      msgType: ChatType.私聊,
      toUserId: params.id * 1,
    });
    if (res.success) {
      setTextareaValue('');
    }
  };

  useEffect(() => {
    if (user.id > 0) {
      getMessageHistoryList();
    }
  }, [user]);

  useEffect(() => {
    function onActiveTowUsers(res: IMessageHistoryList) {
      setMessageHistory((prevMessageHistory: IMessageHistoryList[]) => [...prevMessageHistory, res]);
    }
    socket.on(ActiveTowUsers, onActiveTowUsers);

    return () => {
      socket.off(ActiveTowUsers, onActiveTowUsers);
    };
  }, []);

  useEffect(() => {
    if (msgPage > page.totalPages) return;
    getMessageHistoryList(msgPage);
  }, [msgPage]);

  const getMessageHistoryList = async (msgPage: number = 1) => {
    const res = await messageHistoryList({
      toUserId: params.id,
      page: msgPage,
      limit: 10,
    });
    if (res.success) {
      setMessageHistory([...res.data.content, ...messageHistory].sort((a, b) => a.id - b.id));
      if (page.totalPages < 0) {
        setPage(
          Object.assign(page, {
            totalElements: res.data.totalElements,
            totalPages: res.data.totalPages,
          }),
        );
      }
    }
  };

  const loadMore = () => {
    setMsgPage(msgPage + 1);
  };

  const UpLoadProps: UploadProps = {
    name: 'file',
    action: `${process.env.NEXT_PUBLIC_API_URL}${chatUploadUrl(params.id * 1, ChatType.私聊)} `,
    headers: {
      authorization: `Bearer ${getLocalStorage()}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        message.info(`${info.file}${info.fileList}`);
      }
      if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="flex h-full dark:bg-black bg-gray-50">
      <div className="flex-auto h-full flex">
        <div className="w-full transition-all mb-5">
          {/* 头部 */}
          <div className="flex gap-x-2 mb-2 justify-between   dark:text-white  items-center h-14 pl-2 pr-2 text-center border-l-2 border-b-2 border-gray-200 box-content overflow-hidden">
            <div className="flex w-2/5">
              <img src={selectUserInfo.headerImg} className="rounded-full bg-gray-500 w-9 h-9 mr-3" alt="加载失败" />
              <div className=" font-black text-ellipsis overflow-hidden ...">{selectUserInfo.name}</div>
            </div>
            <div className="dark:text-white flex text-2xl">
              <PhoneOutlined className="mr-3" />
              <VideoCameraOutlined />
            </div>
          </div>

          <div style={{ height: 'calc(100% - 4rem - 3.5rem - 1.25rem - 0.5rem)' }} className="overflow-y-scroll p-2">
            {page.totalPages > 1 && msgPage < page.totalPages && (
              <p className="text-center text-gray-300">
                <Button type="link" onClick={loadMore}>
                  加载更多
                </Button>
              </p>
            )}

            {messageHistory.map((item: IMessageHistoryList) => {
              return item.fromUserId === user.id ? (
                <MyselfMessage item={item} user={user} key={item.id} />
              ) : (
                <CounterpartMessage item={item} key={item.id} user={selectUserInfo} />
              );
            })}
          </div>

          {/* 发送消息 */}
          <div className="w-full flex justify-center min-h-16 mt-2">
            <div className="w-[70%]   flex justify-between items-end">
              <div className="flex justify-center  w-10 h-10 border text-gray-400 text-2xl text-center rounded-full">
                <Upload {...UpLoadProps}>
                  <ToTopOutlined />
                </Upload>
              </div>

              <div className="w-full pl-3 pr-3">
                <TextArea
                  value={textareaValue}
                  onChange={e => setTextareaValue(e.target.value)}
                  placeholder="Controlled autosize"
                  autoSize={{ minRows: 2, maxRows: 5 }}
                />
              </div>

              <div className="flex justify-center  w-10 h-10 border text-gray-400 text-2xl text-center rounded-full">
                <ArrowUpOutlined onClick={send} />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="bg-slate-800 w-60">详细信息33</div> */}
      </div>
    </div>
  );
};

export default ChatContent;
