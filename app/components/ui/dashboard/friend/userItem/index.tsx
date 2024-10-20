import React from 'react';
import './index.scss';
import { ILogin } from '@/app/lib/api/login';

interface IProps {
  userOrGroup: boolean;
  userItem: ILogin;
}

const UserItem = (props: IProps) => {
  return (
    <div
      id="userItem"
      className="w-full bg-white h-20 border-all rounded-md shadow-lg relative overflow-hidden dark:bg-black dark:text-white mb-3 p-3 box-border "
    >
      <div className="active h-full bg-mainForeground w-1 absolute left-0  top-0 hidden"></div>
      <div className="flex items-center  w-2/3">
        {/* 群聊 */}
        {props.userOrGroup && (
          <>
            {/*<img src={props.userItem.headerImg} className="rounded-full bg-gray-500 w-11 h-11 mr-3" />*/}
            <div className="dark:text-white   text-ellipsis overflow-hidden ...">s</div>
          </>
        )}

        {/* 用户 */}
        {!props.userOrGroup && (
          <>
            {' '}
            <img src={props.userItem.headerImg} className="rounded-full bg-gray-500 w-11 h-11 mr-3" />
            <div className="flex flex-col dark:text-white">
              <div>{props.userItem.name}</div>
              {/*<div>1🔑314</div>*/}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserItem;
