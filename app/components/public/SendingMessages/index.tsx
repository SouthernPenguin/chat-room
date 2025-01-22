'use client';
import React from 'react';
import style from './index.module.css';
import TextArea from 'antd/es/input/TextArea';

const SendingMessages: React.FC = () => {
  const [textareaValue, setTextareaValue] = React.useState<string>('');
  return (
    <div className={style['a-textarea']}>
      {/*<TextArea*/}
      {/*  className="textarea"*/}
      {/*  value={textareaValue}*/}
      {/*  onChange={e => setTextareaValue(e.target.value)}*/}
      {/*  placeholder="Controlled autosize"*/}
      {/*  autoSize={{ minRows: 2, maxRows: 5 }}*/}
      {/*/>*/}
      <textarea
        value={textareaValue}
        className={style['textarea']}
        onChange={e => setTextareaValue(e.target.value)}
      ></textarea>
      <pre className={style['hidden-box']}>{textareaValue}</pre>
    </div>
  );
};

export default SendingMessages;
