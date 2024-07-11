"use client";
import { Encrypt } from "@/utils";
import React from "react";

export type AccessToken = string | null;
export type RefreshToken = string | null;

export interface UserType {
    username: string,
    first_name: string,
    last_name: string,
    image: string,
    email: string,
    is_superuser: boolean
}

export interface AuthContextType {
    isAuthenticated: boolean;
    accessToken: AccessToken;
    refreshToken: RefreshToken;
    user: UserType | null;
    AuthenticateUser: (accessToken: AccessToken, refreshToken: RefreshToken) => void;
    UnAuthenticateUser: () => void;
    LoggedInUser: (access: AccessToken, refresh: RefreshToken) => Promise<void>;
    LogoutUser: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

export type AuthenticateUserType = (access: AccessToken, refresh: RefreshToken) => Promise<void>;

export type LoggedInUserType = (access: AccessToken, refresh: RefreshToken) => Promise<void>;

export type LogoutUserType = () => Promise<void>;

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [accessToken, setAccessToken] = React.useState<AccessToken>(null);
    const [refreshToken, setRefreshToken] = React.useState<RefreshToken>(null);
    const [user, setUser] = React.useState<UserType | null>(null);

    const AuthenticateUser: AuthenticateUserType = async (accessToken: AccessToken, refreshToken: RefreshToken) => {
        setIsAuthenticated(true);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    };

    const UnAuthenticateUser = async () => {
        setIsAuthenticated(false);
        setAccessToken(null);
        setRefreshToken(null);
    };

    const LoggedInUser: LoggedInUserType = async (access: AccessToken, refresh: RefreshToken) => {
        await AuthenticateUser(access, refresh);
        sessionStorage.setItem('access', Encrypt(access, process.env.ENCRYPTION_KEY));
        localStorage.setItem('refresh', Encrypt(refresh, process.env.ENCRYPTION_KEY));
    };

    const LogoutUser: LogoutUserType = async () => {
        await UnAuthenticateUser();
        sessionStorage.removeItem('access');
        localStorage.removeItem('refresh');
        sessionStorage.removeItem('user');
    };

    return <AuthContext.Provider value={{
        isAuthenticated, accessToken, refreshToken, user, setUser, AuthenticateUser, UnAuthenticateUser, LoggedInUser, LogoutUser,
    }}>
        {children}
    </AuthContext.Provider>
};