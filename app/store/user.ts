import { create } from 'zustand';
import { ILogin } from '../lib/api/login';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ISelectGroupChat } from '@/app/types/groupChat';

export interface ISelectUserInfo extends ILogin {
  headerImages?: string[];
}

export type IGroupItem = Pick<ISelectUserInfo, 'headerImages' | 'name' | 'id'>;

interface State {
  user: ILogin;
  selectUserInfo: ISelectUserInfo;
  // 用户
  setUserInfo: (info: ILogin) => void;
  setSelectUserInfo: (info: ISelectUserInfo) => void;

  selectGroupInfo: ISelectGroupChat;
  setSelectedGroup: (info: ISelectGroupChat) => void;

  typeUserOrGroupChat: number; //1:user 2:group chat
  setType: (type: number) => void;
  // increase: (by: number) => void;
  // reduce: (by: number) => void;
  // addArr: (item: string) => void;
  // popArr: () => void;
  // changeUser: (obj: userType) => void;
  // changeAge: (age: number) => void;
}

const useUserStore = create<State>()(
  persist(
    (set, get) => ({
      user: { id: -1, name: '', nickname: '', headerImg: '', gender: -1 },
      setUserInfo: (info: ILogin) => set(() => ({ user: Object.assign(get().user, info) })),

      selectUserInfo: { id: -1, name: '', nickname: '', headerImg: '', gender: -1 },
      typeUserOrGroupChat: -1,
      setType: (type: number) => set(() => ({ typeUserOrGroupChat: type })),
      setSelectUserInfo: (info: ISelectUserInfo) => set(() => ({ selectUserInfo: Object.assign({}, info) })),

      selectGroupInfo: { id: -1, name: '', notice: null, createdUserId: -1 },
      setSelectedGroup: (info: ISelectGroupChat) => set(() => ({ selectGroupInfo: Object.assign({}, info) })),
    }),
    {
      name: 'UserInfo', // 存储名称
      storage: createJSONStorage(() => sessionStorage), // 可以更换为 sessionStorage 或其他存储方式
    },
  ),
);

export default useUserStore;

// export const useBearStore = create<BearState>()(set => ({
//   user: { id: -1, name: '', nickname: '', headerImg: '', gender: -1 },
//   setUserInfo: (info: ILogin) => set(state => ({ user: Object.assign(state.user, info) })),
//   // addArr: (item: string) => set(state => ({ list: [...state.list, item] })),
//   // popArr: () => set(state => ({ list: state.list.slice(0, -1) })),
//   // increase: (by: number) => set(state => ({ bears: state.bears + by })),
//   // reduce: (by: number) => set(state => ({ bears: state.bears - by })),
//   // changeUser: (obj: userType) => set(state => ({ user: Object.assign(state.user, obj) })),
//   // changeAge: (age: number) => set(state => ({ user: { ...state.user, age } })),
// }));
