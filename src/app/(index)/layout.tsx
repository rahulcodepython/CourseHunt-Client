"use client";
import React, { useEffect, useState } from 'react';
import { Decrypt } from '@/utils';
import { FetchUserData, RefreshTheAccessToken } from '@/axios';
import Loading from '@/components/Loading';
import { Actions, useAuthStore } from '@/context/AuthStore';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

const IndexLayout = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);

    const updateUser = useAuthStore((state) => state.UpdateUser)
    const loggedInUser = useAuthStore((state) => state.LoggedInUser)
    const loggedOutUser = useAuthStore((state) => state.LogoutUser)
    const verifyToken = useAuthStore((state) => state.VerifyToken)

    useEffect(() => {
        const handler = async () => {
            await CheckUser(updateUser, loggedInUser, loggedOutUser, verifyToken);
            setLoading(false);
        };
        handler();
    }, []);

    return loading ? <Loading /> : <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}

const CheckUser = async (
    updateUser: Actions['UpdateUser'],
    loggedInUser: Actions['LoggedInUser'],
    logoutUser: Actions['LogoutUser'],
    VerifyToken: Actions['VerifyToken']
): Promise<void> => {
    const isRefreshTokenExists = localStorage.getItem("refresh") ?? null;
    const refresh_token = isRefreshTokenExists ? Decrypt(localStorage.getItem("refresh")) : null;

    const isValidateRefreshToken = refresh_token ? await VerifyToken(refresh_token) : null;

    if (!isValidateRefreshToken) {
        await logoutUser();
    } else {
        const isAccessTokenExists = sessionStorage.getItem("access") ?? null;
        const access_token = isAccessTokenExists ? Decrypt(sessionStorage.getItem("access")) : null;

        const isValidateAccessToken = access_token ? await VerifyToken(access_token) : null;

        if (!isValidateAccessToken) {
            await RefreshTheAccessToken(refresh_token, loggedInUser, updateUser);
        } else {
            access_token && refresh_token && loggedInUser(access_token, refresh_token);
        }

        isValidateAccessToken && await FetchUserData(access_token, updateUser);
    }
};

export default IndexLayout;