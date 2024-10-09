'use client';
import { Input, Modal, Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';

interface IProps {
  show: boolean;
  closeOpen: () => void;
}

const FindFriend = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.show) {
      showModal();
    }
  }, [props.show]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
    props.closeOpen();
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
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

  return (
    <>
      <Modal
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
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
        footer={null}
      >
        <Input placeholder="Basic usage" />

        <ul className="pt-5 w-full">
          <li className="flex   items-center h-16  m-auto w-full bg-white dark:bg-black  border-all rounded-md shadow-lg box-content p-2">
            <div className="flex-none">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="rounded-full  w-12 h-12 mr-3"
              />
            </div>
            <div className="grow text-sm">
              <p className="mb-2">
                <span className="text-sky-500 mr-1">昵称</span>
              </p>
              <p className="text-slate-600">
                <span className="text-slate-600">2024/8/8</span>
              </p>
            </div>
            <div className="flex-none">
              <Button>同意</Button>
            </div>
          </li>
        </ul>
      </Modal>
    </>
  );
};

export default FindFriend;
