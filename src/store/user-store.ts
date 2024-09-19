import { UserRole } from '@/types/role';
import { UserData } from '@/types/user';
import type { StateCreator } from 'zustand';
import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

export interface UserStore {
  user: UserData | null;
  activeRole: UserRole | null;
  userId: string | null;
  loading: boolean;
  setUser: (user: UserData | null) => void;
  setActiveRole: (role: UserRole | null) => void;
  setUserId: (userId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>
) => StateCreator<UserStore>;

const useUserStore = create<UserStore>(
  (persist as MyPersist)(
    set => ({
      user: null,
      activeRole: null,
      userId: null,
      loading: false,
      setUser: user => set({ user: user }),
      setActiveRole: role => set({ activeRole: role }),
      setUserId: userId => set({ userId }),
      setLoading: isLoading => set({ loading: isLoading }),
      reset: () =>
        set({
          user: null,
          activeRole: null,
          userId: null,
          loading: false,
        }),
    }),
    { name: 'userStore' }
  )
);

export default useUserStore;
