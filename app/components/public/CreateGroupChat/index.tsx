import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Input, Modal } from 'antd';
import { IProps } from '@/app/lib/type/modalProps';
import { friendList } from '@/app/lib/api/friend';
import { ILogin } from '@/app/lib/api/login';

const CreateGroupChat = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const [toBeSelected, setToBeSelected] = useState<ILogin[]>([]);
  const [selectedList, setSelectedList] = useState<ILogin[]>([]);

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

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
    props.closeOpen();
  };

  const selectItem = (index: number) => {
    const newTobeSelected = [...toBeSelected];
    newTobeSelected[index] = { ...newTobeSelected[index], isCheck: !newTobeSelected[index].isCheck };
    setToBeSelected(newTobeSelected);
    setSelectedList([...newTobeSelected.filter(s => s.isCheck)]);
  };

  const removeSelectItem = (item: ILogin, index: number) => {
    const newSelectedList = [...selectedList];
    const moveItem: ILogin = newSelectedList.splice(index, 1)[0];
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
              toBeSelected.map((item: ILogin, index: number) => {
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
              <p className="text-gray-400">已选1联系人</p>
            </div>
            {selectedList.length &&
              selectedList.map((item: ILogin, index: number) => {
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
