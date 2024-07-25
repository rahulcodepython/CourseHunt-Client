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
    LoggedInUser: (access: string, refresh: string) => Promise<void>;
    LogoutUser: () => Promise<void>;
    UpdateUser: (user: UserType | null) => void;
}

export const useAuthStore = create<State & Actions>((set) => ({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
    LoggedInUser: async (access, refresh) => set({ isAuthenticated: true, accessToken: access, refreshToken: refresh }),
    LogoutUser: async () => set({ isAuthenticated: false, accessToken: null, refreshToken: null }),
    UpdateUser: (user) => set({ user })
}))