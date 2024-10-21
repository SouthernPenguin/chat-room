'use client';
import GroupDetail from '@/app/components/ui/dashboard/friend/detail/groupDetail';
import UserDetail from '@/app/components/ui/dashboard/friend/detail/userDetail';
import React from 'react';
import useUserStore from '@/app/store/user';

const Friend = () => {
  const { typeUserOrGroupChat, selectUserInfo } = useUserStore();
  return (
    <>
      {typeUserOrGroupChat === 1 && selectUserInfo && <UserDetail />}
      {typeUserOrGroupChat === 2 && selectUserInfo && <GroupDetail />}
    </>
  );
};

export default Friend;
