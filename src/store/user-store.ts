import { UserRole } from '@/types/role';
import { User } from '@/types/user';
import type { StateCreator } from 'zustand';
import { create } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

export interface UserStore {
  user: User | null;
  activeRole: UserRole | null;
  userId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  setUser: (data: {
    user: User;
    access_token: string;
    refresh_token: string;
  }) => void;
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
      accessToken: null,
      refreshToken: null,
      loading: false,
      setUser: ({ user, access_token, refresh_token }) =>
        set({
          user,
          userId: user.id,
          accessToken: access_token,
          refreshToken: refresh_token,
          activeRole: user.user_type as UserRole,
        }),
      setActiveRole: role => set({ activeRole: role }),
      setUserId: userId => set({ userId }),
      setLoading: isLoading => set({ loading: isLoading }),
      reset: () =>
        set({
          user: null,
          activeRole: null,
          userId: null,
          accessToken: null,
          refreshToken: null,
          loading: false,
        }),
    }),
    { name: 'userStore' }
  )
);

export default useUserStore;
