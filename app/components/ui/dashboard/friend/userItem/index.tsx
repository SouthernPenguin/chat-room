import React from 'react';
import './index.scss';

interface IProps {
  userOrGroup: boolean;
}

const UserItem = (props: IProps) => {
  return (
    <div
      id="userItem"
      className="w-full bg-white h-20 border-all rounded-md shadow-lg relative overflow-hidden dark:bg-black dark:text-white mb-3 p-3 box-border w-80"
    >
      <div className="flex items-center  w-2/3">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="rounded-full bg-gray-500 w-11 h-11 mr-3"
        />

        {/* 群聊 */}
        {props.userOrGroup && <div className="dark:text-white   text-ellipsis overflow-hidden ...">s</div>}

        {/* 用户 */}
        {!props.userOrGroup && (
          <div className="flex flex-col dark:text-white">
            <div>1234 </div>
            <div>1🔑314</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserItem;
