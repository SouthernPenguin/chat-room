import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Input, message, Modal } from 'antd';
import { IProps } from '@/app/types/modalProps';
import { friendList } from '@/app/lib/api/friend';
import { creatGroupChat } from '@/app/lib/api/groupChat';
import { IUser } from '@/app/types/user';

const CreateGroupChat = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const [toBeSelected, setToBeSelected] = useState<IUser[]>([]);
  const [selectedList, setSelectedList] = useState<IUser[]>([]);

  useEffect(() => {
    if (props.show) {
      showModal();
      getFriend();
    }
  }, [props.show]);

  const showModal = () => {
    setOpen(true);
  };

  const getFriend = async () => {
    const res = await friendList();
    if (res.success) {
      res.data.content.forEach(item => {
        item.isCheck = false;
      });
      setToBeSelected([...res.data.content]);
    }
  };

  const handleOk = async () => {
    const res = await creatGroupChat({
      name: selectedList.map(item => item.name).toString(),
      userIds: selectedList.map(item => item.id),
    });
    if (res.success) {
      setOpen(false);
      setSelectedList([]);
      message.success('创建成功');
      props.closeOpen();
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedList([]);
    props.closeOpen();
  };

  const selectItem = (index: number) => {
    const newTobeSelected = [...toBeSelected];
    newTobeSelected[index] = { ...newTobeSelected[index], isCheck: !newTobeSelected[index].isCheck };
    setToBeSelected(newTobeSelected);
    setSelectedList([...newTobeSelected.filter(s => s.isCheck)]);
  };

  const removeSelectItem = (item: IUser, index: number) => {
    const newSelectedList = [...selectedList];
    const moveItem: IUser = newSelectedList.splice(index, 1)[0];
    toBeSelected.forEach(item => {
      if (item.id === moveItem.id) {
        item.isCheck = false;
      }
    });
    setSelectedList(newSelectedList);
    setToBeSelected(toBeSelected);
  };

  return (
    <>
      <Modal
        open={open}
        title={null}
        closable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" type="primary" onClick={handleOk}>
            确定
          </Button>,
          <Button key="submit" onClick={handleCancel}>
            取消
          </Button>,
        ]}
      >
        <div className="flex justify-between box-border ">
          {/*待选*/}
          <div className="flex-1 h-96 relative overflow-y-scroll">
            <Input placeholder="Basic usage" size="small" className="mb-3" />

            {toBeSelected.length &&
              toBeSelected.map((item: IUser, index: number) => {
                return (
                  <div
                    key={item.id}
                    className="w-full h-14 flex items-center hover:bg-gray-100 rounded box-border p-1"
                    onClick={() => selectItem(index)}
                  >
                    <Checkbox checked={item.isCheck} />
                    <img src={item.headerImg} alt="无图片" className="rounded-full w-10 h-10 ml-1 mr-1" />
                    <span className="text-black">{item.name}</span>
                  </div>
                );
              })}
          </div>

          {/*已选*/}
          <div className="flex-1  h-96 pl-5 overflow-y-scroll">
            <div className="flex justify-between">
              <p>创建群聊</p>
              <p className="text-gray-400">已选{selectedList.length}联系人</p>
            </div>
            {selectedList.length &&
              selectedList.map((item: IUser, index: number) => {
                return (
                  <div
                    key={item.id}
                    className="w-full h-14 flex items-center justify-between hover:bg-gray-100 rounded box-border p-1"
                  >
                    <div className="flex  items-center">
                      <img src={item.headerImg} alt="无图片" className="rounded-full w-10 h-10 ml-1 mr-1" />
                      <span className="text-black">{item.name}</span>
                    </div>
                    <Button type="primary" danger size="small" onClick={() => removeSelectItem(item, index)}>
                      移除
                    </Button>
                  </div>
                );
              })}
          </div>
          <div className="w-[1px] h-96 bg-gray-200 absolute top-1/2  -translate-y-1/2 left-1/2"></div>
        </div>
      </Modal>
    </>
  );
};

export default CreateGroupChat;
