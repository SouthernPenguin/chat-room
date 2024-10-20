import { create } from 'zustand';

interface SocketState {
  awaitFriendsNumber: number;
  setAwaitFriendsNumber: (awaitFriendsNumber: number) => void;
  clearAwaitFriendsNumber: () => void;
}

const useSocket = create<SocketState>(set => ({
  awaitFriendsNumber: 0,
  setAwaitFriendsNumber: (count: number) => set(state => ({ awaitFriendsNumber: state.awaitFriendsNumber + count })),
  clearAwaitFriendsNumber: () => set(state => ({ awaitFriendsNumber: 0 })),
}));

export default useSocket;
