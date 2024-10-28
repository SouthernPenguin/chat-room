import React from 'react';
import './index.scss';
import { ILogin } from '@/app/lib/api/login';
import useUserStore, { IGroupItem, ISelectUserInfo } from '@/app/store/user';
import { stringCapture } from '@/app/utils';

interface IProps {
  userOrGroup: boolean;
  userItem?: ILogin | undefined;
  groupItem?: IGroupItem;
}

const UserItem = (props: IProps) => {
  const { userOrGroup, userItem, groupItem } = props;

  const { setType, setSelectUserInfo } = useUserStore();

  const goDetail = () => {
    setType(userOrGroup ? 2 : 1);
    if (userItem && !userOrGroup) {
      setSelectUserInfo(userItem);
    }

    if (groupItem && userOrGroup) {
      setSelectUserInfo(groupItem as ISelectUserInfo);
    }
  };
  return (
    <div
      id="userItem"
      className="w-full bg-white h-20 border-all rounded-md shadow-lg relative overflow-hidden dark:bg-black dark:text-white mb-3 p-3 box-border "
      onClick={() => goDetail()}
    >
      <div className="active h-full bg-mainForeground w-1 absolute left-0  top-0 hidden"></div>
      <div className="flex items-center  w-2/3">
        {/* 群聊 */}
        {userOrGroup && (
          <>
            <div className="rounded-full w-14 h-14 w- mr-3">
              <ul className="rounded-full flex  justify-around flex-wrap-reverse items-center  w-full h-full overflow-hidden">
                {groupItem?.headerImages &&
                  groupItem.headerImages.map((item, index) => {
                    return (
                      <li className="w-4 h-4" key={index}>
                        <img src={item} alt="无图片" />
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="dark:text-white   text-ellipsis overflow-hidden ...">{stringCapture(groupItem?.name)}</div>
          </>
        )}

        {/* 用户 */}
        {!userOrGroup && (
          <>
            <img src={userItem?.headerImg} className="rounded-full bg-gray-500 w-14 h-14 mr-3" alt="无图片" />
            <div className="flex flex-col dark:text-white">
              <div>{userItem?.name}</div>
              {/*<div>1🔑314</div>*/}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserItem;
