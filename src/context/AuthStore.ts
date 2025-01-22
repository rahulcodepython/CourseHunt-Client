import { AuthStoreActions, AuthStoreState, UserType } from '@/types';
import { decodeJwtToken } from '@/utils';
import { create } from 'zustand';

export const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
    isAuthenticated: false,
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
    LoggedInUser: (access, refresh) => set({
        isAuthenticated: true,
        accessToken: access,
        refreshToken: refresh,
        user: access ? decodeJwtToken(access) as UserType : undefined
    }),
    LogoutUser: () => set({
        isAuthenticated: false,
        accessToken: undefined,
        refreshToken: undefined,
        user: undefined
    }),
}))