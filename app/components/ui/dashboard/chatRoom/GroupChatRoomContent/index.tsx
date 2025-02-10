'use client';
import { PhoneOutlined, ToTopOutlined, VideoCameraOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { Button, message, Upload, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { ChatType } from '@/app/types/enmu';
import { chatUploadUrl } from '@/app/lib/api/upload';

import socket from '@/app/utils/socket/socket';
import { ActiveTowUsers } from '@/app/utils/socket';
import { getLocalStorage } from '@/app/utils';
import useUserStore from '@/app/store/user';
import MyselfMessage from './MyselfMessage';
import CounterpartMessage from './CounterpartMessage';

import { groupChatHistory, sendMessage } from '@/app/lib/api/groupChat';
import { IChatMessageHistoryList } from '@/app/types/groupChat';
import SendingMessages from '@/app/components/public/SendingMessages';

const ChatContent: React.FC = () => {
  const { selectGroupInfo, user } = useUserStore();
  const [messageHistory, setMessageHistory] = useState<IChatMessageHistoryList[]>([]);
  const [page, setPage] = useState<{ totalElements: number; totalPages: number }>({
    totalElements: -1,
    totalPages: -1,
  });
  const [msgPage, setMsgPage] = useState<number>(1);

  const params = useParams<Params>();

  const scrollableDivRef = useRef(null);

  const send = async (str: string) => {
    const res = await sendMessage({
      postMessage: str,
      msgType: ChatType.群聊,
      groupId: params.id * 1,
    });
    if (res.success) {
      scrollableDivRefFn();
    }
  };

  useEffect(() => {
    if (user.id > 0) {
      getMessageHistoryList();
    }
  }, [user]);

  useEffect(() => {
    getMessageHistoryList(msgPage);
  }, [params.id]);

  // socket
  useEffect(() => {
    function onActiveTowUsers(res: IChatMessageHistoryList | string) {
      if (typeof res === 'string') {
        setMessageHistory((prevMessageHistory: IChatMessageHistoryList[]) => {
          const newArray = [...prevMessageHistory];
          newArray.splice(-1, 1);
          return newArray;
        });
      } else {
        setMessageHistory((prevMessageHistory: IChatMessageHistoryList[]) => {
          return [...prevMessageHistory, res];
        });
      }
    }
    scrollableDivRefFn();
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
    const res = await groupChatHistory(params.id, {
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
    action: `${process.env.NEXT_PUBLIC_API_URL}${chatUploadUrl(params.id * 1, ChatType.群聊)} `,
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
    fileList: [],
  };

  const scrollableDivRefFn = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
  };

  return (
    <div className="flex h-full dark:bg-black bg-gray-50">
      <div className="flex-auto h-full flex">
        <div className="w-full transition-all mb-5">
          {/* 头部 */}
          <div className="flex gap-x-2 mb-2 justify-between   dark:text-white  items-center h-14 pl-2 pr-2 text-center border-l-2 border-b-2 border-gray-200 box-content overflow-hidden">
            <div className="flex w-2/5">
              {/*<img src={selectGroupInfo.headerImg!} className="rounded-full bg-gray-500 w-9 h-9 mr-3" alt="加载失败" />*/}
              <div className=" font-black text-ellipsis overflow-hidden ...">{selectGroupInfo.name}</div>
            </div>
            <div className="dark:text-white flex text-2xl">
              <PhoneOutlined className="mr-3" />
              <VideoCameraOutlined />
            </div>
          </div>

          {/*内容区域*/}
          <div
            ref={scrollableDivRef}
            style={{ height: 'calc(100% - 4rem - 3.5rem - 1.25rem - 0.5rem)' }}
            className="overflow-y-scroll p-2"
          >
            {page.totalPages > 1 && msgPage < page.totalPages && (
              <p className="text-center text-gray-300">
                <Button type="link" onClick={loadMore}>
                  加载更多
                </Button>
              </p>
            )}

            {messageHistory.map((item: IChatMessageHistoryList) => {
              return item.fromUserId === user.id ? (
                <MyselfMessage item={item} user={item.fromUser} key={item.id} />
              ) : (
                <CounterpartMessage item={item} key={item.id} user={item.fromUser} />
              );
            })}
          </div>

          {/* 发送消息 */}
          <SendingMessages upLoadProps={UpLoadProps} sendTextareaValue={send} />
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
