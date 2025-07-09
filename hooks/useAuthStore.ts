import User from '@/types/User';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isHydrated: boolean;
  setAuth: (auth: { accessToken: string; refreshToken: string; user: User }) => void;
  updateUser: (fields: Partial<User>) => void;
  clearAuth: () => void;
  setHydrated: (v: boolean) => void;
}

const secureStorage = {
  getItem: async (key: string) => {
    const value = await SecureStore.getItemAsync(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (key: string, value: any) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isHydrated: false,
      setAuth: ({ accessToken, refreshToken, user }) => set({ accessToken, refreshToken, user }),
      updateUser: (fields) =>
        set((state) => state.user
          ? { user: { ...state.user, ...fields } }
          : state                                      // if user==null, do nothing
        ),
      clearAuth: () => set({ accessToken: null, refreshToken: null, user: null }),
      setHydrated: (v) => set({ isHydrated: v }),
    }),
    {
      name: 'auth-storage',
      storage: secureStorage,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
