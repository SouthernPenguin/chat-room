import { IUser } from '@/app/types/user';

export interface IUserFriendInformation {
  peopleNumber: number;
  groupChatNumber: number;
  manWomamNumber: { number: number; gender: string }[];
}

export interface IUserInformPanel {
  userFriendInformation: IUserFriendInformation;
  userInform: IUser;
}
