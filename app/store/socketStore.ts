import { create } from 'zustand';

interface SocketState {
  awaitFriendsNumber: number;
  setAwaitFriendsNumber: (awaitFriendsNumber: number) => void;
  clearAwaitFriendsNumber: () => void;
  reduceAwaitFriendsNumber: () => void;
}

const useSocket = create<SocketState>(set => ({
  awaitFriendsNumber: 0,
  setAwaitFriendsNumber: (count: number) => set(state => ({ awaitFriendsNumber: state.awaitFriendsNumber + count })),
  clearAwaitFriendsNumber: () => set(state => ({ awaitFriendsNumber: 0 })),
  reduceAwaitFriendsNumber: () => set(state => ({ awaitFriendsNumber: state.awaitFriendsNumber - 1 })),
}));

export default useSocket;
