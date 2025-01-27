import React, { useEffect, useRef, useState } from 'react';
import { Button, message, Modal } from 'antd';
import Draggable, { type DraggableData, type DraggableEvent } from 'react-draggable';
import TextArea from 'antd/es/input/TextArea';
import useUserStore from '@/app/store/user';
import { addFriend } from '@/app/lib/api/friend';
import { IUser } from '@/app/types/user';

interface IProps {
  show: boolean;
  userInfo?: IUser;
  closeOpen: () => void;
}
// 定义验证模式
const ApplyAorFriends = (props: IProps) => {
  const [disabled, setDisabled] = useState(true);
  const [notes, setNotes] = useState<string>('');
  const [open, setOpen] = React.useState(false);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggableRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();

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

  useEffect(() => {
    if (props.show) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [props.show]);

  const send = async () => {
    try {
      const res = await addFriend({
        friendId: props.userInfo!.id,
        fromUserId: user.id,
        notes,
      });
      if (res.success) {
        message.success('添加成功！');
        closeOpen();
      }
    } catch (e) {}
  };

  const closeOpen = () => {
    setOpen(false);
    setNotes('');
    props.closeOpen();
  };

  return (
    <>
      {/*onOk={handleOk} onCancel={handleCancel}*/}
      <Modal
        footer={() => (
          <>
            <Button type="primary" onClick={() => send()}>
              发送
            </Button>
            <Button onClick={() => closeOpen()}>取消</Button>
          </>
        )}
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
            申请加好友
          </div>
        }
        open={open}
        modalRender={modal1 => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggableRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggableRef}>{modal1}</div>
          </Draggable>
        )}
      >
        <div>
          <div className="flex items-center mb-2">
            <img className="w-16 rounded-full mr-3" src={props.userInfo?.headerImg} alt="" />
            <p>{props.userInfo?.name}</p>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400">请填写验证消息</span>
            <TextArea
              placeholder="请输入内容"
              maxLength={100}
              style={{ height: 80, resize: 'none' }}
              onChange={event => setNotes(event.target.value)}
              value={notes}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ApplyAorFriends;
