'use client';
import UserInform from '@/app/components/ui/dashboard/Panel/userInform';
import UserFriendsInform from '@/app/components/ui/dashboard/Panel/userFriendsInform';
import { useEffect, useState } from 'react';
import { getUserInformPanel } from '@/app/lib/api/panel';
import { IUserInformPanel } from '@/app/types/panel';

const Panel = () => {
  const [userInformPanel, setUserInformPanel] = useState<IUserInformPanel>({});
  useEffect(() => {
    getPanel();
  }, []);

  const getPanel = async () => {
    const res = await getUserInformPanel();
    if (res.success) {
      setUserInformPanel(res.data);
    }
  };
  return (
    <div className="flex m-2">
      {userInformPanel.userInform && <UserInform userInform={userInformPanel.userInform} />}
      {userInformPanel.userFriendInformation && (
        <UserFriendsInform userFriendInformation={userInformPanel.userFriendInformation} />
      )}
    </div>
  );
};

export default Panel;
