import { AuthStoreActions, AuthStoreState } from '@/types';
import { create } from 'zustand';

export const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
    LoggedInUser: (access, refresh, user) => set({ isAuthenticated: true, accessToken: access, refreshToken: refresh, user: user }),
    LogoutUser: () => set({ isAuthenticated: false, accessToken: null, refreshToken: null, user: null }),
    UpdateUser: (user) => set({ user }),
}))