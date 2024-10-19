'use client';
import { findFriend } from '@/app/lib/api/friend';
import { ILogin } from '@/app/lib/api/login';
import { SearchPageInterface } from '@/app/lib/type/publiceType';
import { LoadingOutlined } from '@ant-design/icons';
import { Input, Modal, Button, Skeleton, Divider, Empty, Spin } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import InfiniteScroll from 'react-infinite-scroll-component';
import ApplyAorFriends from './ApplyAorFriends';

interface IProps {
  show: boolean;
  closeOpen: () => void;
}

interface ISelectItem {
  show: boolean;
  userInfo?: ILogin;
}

const FindFriend = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggableRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [findFriendList, setFindFriendList] = useState<ILogin[]>([]);
  const [pages, setPages] = useState<{
    totalElements: number;
    totalPages: number;
  }>({
    totalElements: -1,
    totalPages: -1,
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [page, setPage] = useState<number>(2);
  const [selectItem, setSelectItem] = useState<ISelectItem>({ show: false });

  useEffect(() => {
    if (props.show) {
      showModal();
    }
  }, [props.show]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    props.closeOpen();
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggableRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await getFindFriend();
    }
  };

  const getFindFriend = async (page: SearchPageInterface = { page: 1, limit: 10 }) => {
    setLoading(true);
    try {
      const res = await findFriend({
        name: inputValue,
        ...page,
      });
      setFindFriendList([...findFriendList, ...res.data.content]);
      setPages({
        totalElements: res.data.totalElements,
        totalPages: res.data.totalPages,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = async () => {
    setPage(page + 1);
    if (page <= pages.totalPages) {
      await getFindFriend({ page: page, limit: 10 });
    }
  };
  return (
    <>
      <Modal
        width="45%"
        title={
          <div
            style={{ width: '100%', cursor: 'move', textAlign: 'center' }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            全网搜索
          </div>
        }
        open={open}
        onCancel={handleCancel}
        modalRender={modal => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggableRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggableRef}>{modal}</div>
          </Draggable>
        )}
        footer={null}
        afterClose={() => {
          setFindFriendList([]);
          setPage(2);
        }}
      >
        <div className="w-full flex flex-col justify-center mb-2">
          <Input
            placeholder="Basic usage"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={event => handleKeyDown(event)}
            className="w-[97%]"
          />
          {loading && <Spin indicator={<LoadingOutlined spin />} style={{ fontSize: 48 }} />}
        </div>

        {!loading && findFriendList.length <= 0 && <Empty />}

        {findFriendList.length > 0 && (
          <ul className="custom-scrollbar pt-5 w-full h-96 overflow-y-scroll overflow-w-hide" id="scrollableDiv">
            <InfiniteScroll
              next={loadMoreData}
              dataLength={findFriendList.length}
              hasMore={findFriendList.length < pages.totalElements}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              {findFriendList.map(item => {
                return (
                  <li
                    key={item.id}
                    className="flex mb-3 items-center h-16  m-auto w-[97%] bg-white dark:bg-black  border-all rounded-md shadow-lg box-content p-2"
                  >
                    <div className="flex-none">
                      <img src={item.headerImg} className="rounded-full  w-12 h-12 mr-3" alt="" />
                    </div>
                    <div className="grow text-sm">
                      <p className="mb-2">
                        <span className="text-sky-500 mr-1">{item.name}</span>
                      </p>
                      <p className="text-slate-600">
                        <span className="text-slate-600">{item.nickname} </span>
                      </p>
                    </div>
                    <div className="flex-none mr-2">
                      <Button onClick={() => setSelectItem({ show: true, userInfo: item })}>添加</Button>
                    </div>
                  </li>
                );
              })}
            </InfiniteScroll>
          </ul>
        )}
      </Modal>

      <ApplyAorFriends
        show={selectItem.show}
        userInfo={selectItem.userInfo}
        closeOpen={() => setSelectItem({ show: false })}
      />
    </>
  );
};

export default FindFriend;
