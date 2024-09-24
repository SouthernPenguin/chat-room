import { create } from 'zustand';

type userType = {
  name: string;
  age: number;
};

interface BearState {
  bears: number;
  list: string[];
  user: userType;
  increase: (by: number) => void;
  reduce: (by: number) => void;
  addArr: (item: string) => void;
  popArr: () => void;
  changeUser: (obj: userType) => void;
  changeAge: (age: number) => void;
}

export const useBearStore = create<BearState>()(set => ({
  bears: 0,
  list: [],
  user: { name: '0', age: 0 },
  addArr: (item: string) => set(state => ({ list: [...state.list, item] })),
  popArr: () => set(state => ({ list: state.list.slice(0, -1) })),
  increase: (by: number) => set(state => ({ bears: state.bears + by })),
  reduce: (by: number) => set(state => ({ bears: state.bears - by })),
  changeUser: (obj: userType) => set(state => ({ user: Object.assign(state.user, obj) })),
  changeAge: (age: number) => set(state => ({ user: { ...state.user, age } })),
}));
