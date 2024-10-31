'use client';
import { PhoneOutlined, PaperClipOutlined, VideoCameraOutlined, AudioFilled, SendOutlined } from '@ant-design/icons';
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
import { Button } from 'antd';

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

            {messageHistory.length &&
              messageHistory.map((item: IMessageHistoryList) => {
                return item.fromUserId === user.id ? (
                  <MyselfMessage item={item} user={user} key={item.id} />
                ) : (
                  <CounterpartMessage item={item} key={item.id} user={selectUserInfo} />
                );
              })}
          </div>

          {/* 发送消息 */}
          <div className="w-full flex justify-center min-h-16 mt-2">
            <div
              // bg-zinc-400 min-h-14
              className=" w-3/5 rounded-[30px] flex justify-between items-center pl-3 box-border"
              style={{ background: '#cdcdcd66' }}
            >
              <div className="h-full flex justify-end items-end box-border pb-4">
                <PaperClipOutlined className="text-3xl text-white " />
              </div>

              <div className="flex min-h-14 justify-center w-3/4 overflow-hidden transform origin-bottom">
                {/*<TextArea*/}
                {/*  placeholder="Autosize height based on content lines"*/}
                {/*  autoSize={{ minRows: 2, maxRows: 8 }}*/}
                {/*  className="w-11/12 h-10 border-none bg-inherit focus:outline-none focus:border-transparent"*/}
                {/*/>*/}
                <textarea
                  rows={8}
                  className="w-11/12 h-10 border-none bg-inherit focus:outline-none focus:border-transparent"
                  value={textareaValue}
                  onChange={event => setTextareaValue(event.target.value)}
                />
              </div>

              <div className="h-full flex justify-end items-end box-border ">
                <div className=" pb-4">
                  <AudioFilled className="text-white text-3xl" />
                </div>
                <div className="bg-mainForeground relative rounded-full h-14 w-14 text-3xl text-white -rotate-45  mb-1">
                  <SendOutlined
                    className="absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2"
                    onClick={send}
                  />
                </div>
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
