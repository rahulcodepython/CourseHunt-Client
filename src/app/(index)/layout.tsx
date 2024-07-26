"use client";
import React, { useEffect, useState } from 'react';
import { Decrypt, GetDecryptedToken } from '@/utils';
import { FetchUserData, RefreshTheAccessToken, VerifyToken } from '@/axios';
import Loading from '@/components/Loading';
import { Actions, useAuthStore } from '@/context/AuthStore';
import { hasCookie, getCookie } from 'cookies-next';

const IndexLayout = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);

    const updateUser = useAuthStore((state) => state.UpdateUser)
    const loggedInUser = useAuthStore((state) => state.LoggedInUser)
    const loggedOutUser = useAuthStore((state) => state.LogoutUser)

    useEffect(() => {
        const handler = async () => {
            await CheckUser(updateUser, loggedInUser, loggedOutUser);
            setLoading(false);
        };
        handler();
    }, []);

    return loading ? <Loading /> : children;
}

const CheckUser = async (
    updateUser: Actions['UpdateUser'],
    loggedInUser: Actions['LoggedInUser'],
    logoutUser: Actions['LogoutUser'],
): Promise<void> => {
    const refresh_token: string | null = hasCookie("refresh") ? GetDecryptedToken(getCookie("refresh")) : null;

    const isValidateRefreshToken = refresh_token ? await VerifyToken(refresh_token) : null;

    if (!isValidateRefreshToken) {
        await logoutUser();
    } else {
        const access_token: string | null = hasCookie("access") ? GetDecryptedToken(getCookie("access")) : null;

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