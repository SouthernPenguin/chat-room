'use client';
import React, { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { ArrowUpOutlined, ToTopOutlined } from '@ant-design/icons';
import { message, Upload, UploadProps } from 'antd';

interface IProps {
  upLoadProps: UploadProps;
  sendTextareaValue: (str: string) => void;
}
const SendingMessages = (props: IProps) => {
  const { upLoadProps, sendTextareaValue } = props;

  const [textareaValue, setTextareaValue] = useState<string>('');
  const send = () => {
    if (!textareaValue) {
      message.error('请输入内容');
      return;
    }
    sendTextareaValue(textareaValue);
    setTextareaValue('');
  };
  return (
    <div className="w-[50%] fixed right-[12%] box-border rounded-lg bottom-1 dark:bg-black  20  bg-gray-200">
      <div className="w-11/12 m-auto pt-1 pb-1">
        <TextArea
          value={textareaValue}
          onChange={e => setTextareaValue(e.target.value)}
          placeholder="请输入内容"
          autoSize={{ minRows: 2, maxRows: 8 }}
          className="bg-transparent border-none hover:bg-transparent hover:border-none"
        />

        <div className="justify-end flex mt-2">
          <div className="  text-white rounded-full w-9 h-9 text-center  flex justify-center items-center">
            <Upload {...upLoadProps}>
              <ToTopOutlined className="text-2xl " />
            </Upload>
          </div>

          <div className="bg-red-400 text-white rounded-full w-9 h-9 text-center text-2xl  flex justify-center items-center">
            <ArrowUpOutlined onClick={send} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendingMessages;
