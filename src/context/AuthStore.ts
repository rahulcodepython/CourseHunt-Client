import { AuthStoreActions, AuthStoreState } from '@/types';
import { create } from 'zustand';

export const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
    isAuthenticated: false,
    accessToken: undefined,
    refreshToken: undefined,
    LoggedInUser: (access, refresh) => set({ isAuthenticated: true, accessToken: access, refreshToken: refresh }),
    LogoutUser: () => set({ isAuthenticated: false, accessToken: undefined, refreshToken: undefined }),
}))