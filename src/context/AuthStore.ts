import axios from 'axios';
import { create } from 'zustand'

export interface UserType {
    username: string,
    first_name: string,
    last_name: string,
    image: string,
    email: string,
    is_superuser: boolean
}

export interface State {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    user: UserType | null;
}

export interface Actions {
    LoggedInUser: (access: string, refresh: string, user: UserType) => void;
    LogoutUser: () => void;
    UpdateUser: (user: UserType | null) => void;
    VerifyToken: (token: string) => Promise<boolean>;
}

export const useAuthStore = create<State & Actions>((set) => ({
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