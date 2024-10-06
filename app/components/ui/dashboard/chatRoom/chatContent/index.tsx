'use client';
import { PhoneOutlined, PaperClipOutlined, VideoCameraOutlined, AudioFilled, SendOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';
import React from 'react';

const ChatContent: React.FC = () => {
  return (
    <div className="flex h-full dark:bg-black bg-gray-50">
      <div className="flex-auto h-full flex">
        <div className="w-full transition-all mb-5">
          {/* 头部 */}
          <div className="flex gap-x-2 mb-2 justify-between   dark:text-white  items-center h-14 pl-2 pr-2 text-center border-l-2 border-b-2 border-gray-200 box-content overflow-hidden">
            <div className="flex w-2/5">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="rounded-full bg-gray-500 w-9 h-9 mr-3"
              />
              <div className=" font-black text-ellipsis overflow-hidden ...">
                fsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsf
              </div>
            </div>
            <div className="dark:text-white flex text-2xl">
              <PhoneOutlined className="mr-3" />
              <VideoCameraOutlined />
            </div>
          </div>

          <div style={{ height: 'calc(100% - 4rem - 3.5rem - 1.25rem - 0.5rem)' }} className="overflow-y-scroll p-2">
            <div className="w-full">
              <div className="flex w-2/5">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="rounded-full bg-gray-500 w-9 h-9 mr-3"
                />
                <div>
                  <div
                    className="bg-white rounded-r-3xl rounded-bl-3xl p-2 w-screen-md shadow-lg  dark:bg-mainBackground dark:text-white mb-1"
                    style={{ wordBreak: 'break-all' }}
                  >
                    ffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsfffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsfffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsf
                  </div>
                  <div className="text-gray-500 dark:text-white">45 分组亲</div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end">
              <div className="flex w-2/5 ">
                <div>
                  <div
                    className="bg-mainForeground rounded-l-3xl rounded-br-3xl  p-2  w-screen-md  shadow-lg dark:text-white mb-1"
                    style={{ wordBreak: 'break-all' }}
                  >
                    ffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsfffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsfffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsffsadsf
                  </div>
                  <div className="text-right text-gray-500 dark:text-white">45 分组亲</div>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="rounded-full bg-gray-500 w-9 h-9 ml-3"
                />
              </div>
            </div>
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
                {/* <TextArea
                  placeholder="Autosize height based on content lines"
                  autoSize={{ minRows: 2, maxRows: 8 }}
                  className="w-11/12 h-10 border-none bg-inherit focus:outline-none focus:border-transparent"
                /> */}
                <textarea
                  rows={8}
                  className="w-11/12 h-10 border-none bg-inherit focus:outline-none focus:border-transparent  "
                />
              </div>

              <div className="h-full flex justify-end items-end box-border ">
                <div className=" pb-4">
                  <AudioFilled className="text-white text-3xl" />
                </div>
                <div className="bg-mainForeground relative rounded-full h-14 w-14 text-3xl text-white -rotate-45  mb-1">
                  <SendOutlined className="absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2" />
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
