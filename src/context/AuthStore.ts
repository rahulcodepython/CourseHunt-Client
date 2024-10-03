import { AuthStoreActions, AuthStoreState } from '@/types';
import axios from 'axios';
import { create } from 'zustand';

export const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
    LoggedInUser: (access, refresh, user) => set({ isAuthenticated: true, accessToken: access, refreshToken: refresh, user: user }),
    LogoutUser: () => set({ isAuthenticated: false, accessToken: null, refreshToken: null, user: null }),
    UpdateUser: (user) => set({ user }),
    VerifyToken: async (token) => {
        try {
            const options = {
                url: `${process.env.BASE_API_URL}/auth/users/jwt/verify/`,
                method: 'POST',
                data: {
                    token: token
                }
            };

            await axios.request(options);
            return true;
        } catch (error) {
            return false;
        }
    }
}))