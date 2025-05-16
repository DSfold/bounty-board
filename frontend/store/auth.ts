import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserType = { id: string; email: string; access_token: string };

type AuthStore = {
  user: null | UserType;
  setUser: (user: AuthStore['user']) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
