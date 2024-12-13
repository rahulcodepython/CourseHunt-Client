import { AuthStoreActions, AuthStoreState } from '@/types';
import { create } from 'zustand';

export const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
    isAuthenticated: false,
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
    LoggedInUser: (access, refresh, user) => set({ isAuthenticated: true, accessToken: access, refreshToken: refresh, user: user }),
    LogoutUser: () => set({ isAuthenticated: false, accessToken: undefined, refreshToken: undefined, user: undefined }),
    UpdateUser: (user) => set({ user }),
}))