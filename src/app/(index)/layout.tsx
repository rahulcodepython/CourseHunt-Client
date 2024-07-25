"use client";
import React, { useEffect, useState } from 'react';
import { Decrypt, FetchUserData } from '@/utils';
import Loading from '@/components/Loading';
import axios from 'axios';
import { Actions, useAuthStore } from '@/context/AuthStore';

const IndexLayout = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);

    const updateUser = useAuthStore((state) => state.UpdateUser)
    const loggedInUser = useAuthStore((state) => state.LoggedInUser)
    const loggedOutUser = useAuthStore((state) => state.LogoutUser)

    useEffect(() => {
        const handler = async () => {
            await CheckUser(updateUser, loggedInUser, loggedOutUser);
        };

        handler().finally(() => {
            setLoading(false);
        });
    }, []);

    return loading ? <Loading /> : children;
}

const VerifyToken = async (token: string): Promise<boolean> => {
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
};

const RefreshTheAccessToken = async (
    token: string | null,
    loggedInUser: Actions['LoggedInUser'],
    updateUser: Actions['UpdateUser'],
): Promise<void> => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/jwt/refresh/`,
        method: 'POST',
        data: {
            refresh: token
        }
    };
    try {
        const response = await axios.request(options);
        await loggedInUser(response.data.access, response.data.refresh);
        await FetchUserData(response.data.access, updateUser);
    } catch (error) {
        return;
    }
};

const CheckUser = async (
    updateUser: Actions['UpdateUser'],
    loggedInUser: Actions['LoggedInUser'],
    logoutUser: Actions['LogoutUser'],
): Promise<void> => {
    const isRefreshTokenExists = localStorage.getItem("refresh") ?? null;
    const refresh_token = isRefreshTokenExists ? Decrypt(localStorage.getItem("refresh"), process.env.ENCRYPTION_KEY) : null;
    const isValidateRefreshToken = refresh_token ? await VerifyToken(refresh_token) : null;

    if (!isValidateRefreshToken) {
        await logoutUser();
    } else {
        const isAccessTokenExists = sessionStorage.getItem("access") ?? null;
        const access_token = isAccessTokenExists ? Decrypt(sessionStorage.getItem("access"), process.env.ENCRYPTION_KEY) : null;
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