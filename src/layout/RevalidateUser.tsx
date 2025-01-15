"use client"
import { useAuthStore } from '@/context/AuthStore';
import { removeCookie, setCookie, } from '@/server/action';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';

const RevalidateUser = ({
    accessToken, refreshToken, user, loader, children, redirect = true
}: {
    accessToken: string | undefined,
    refreshToken: string | undefined,
    user: string | undefined,
    loader: React.ReactNode,
    children: React.ReactNode
    redirect?: boolean
}) => {
    const [loading, setLoading] = React.useState<boolean>(false);

    const router = useRouter();

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const loggedInUser = useAuthStore((state) => state.LoggedInUser)

    React.useEffect(() => {
        if (isAuthenticated) {
            return;
        }

        setLoading(true);
        const handler = async (): Promise<void> => {
            try {
                if (!accessToken || !refreshToken) {
                    throw new Error('Invalid Token');
                }

                const verify_access_token: boolean = accessToken ? await verifyToken(accessToken) : false;

                if (!verify_access_token) {
                    const verify_refresh_token: boolean = refreshToken ? await verifyToken(refreshToken) : false;

                    if (!verify_refresh_token) {
                        throw new Error('Invalid Refresh Token');
                    }
                    if (refreshToken) {
                        const response = await refreshAccessToken(refreshToken);

                        if (response?.access && response?.refresh && response?.user) {
                            loggedInUser(response.access, refreshToken, response.user)
                            return;
                        }
                        else {
                            throw new Error('Invialid Refresh Token');
                        }
                    }
                }

                if (user === undefined) {
                    const response = await getUser(accessToken);

                    if (response) {
                        loggedInUser(accessToken, refreshToken, response)
                        await setCookie('user', JSON.stringify(response));
                        return;
                    }
                    else {
                        throw new Error('Invalid User');
                    }
                } else {
                    loggedInUser(accessToken, refreshToken, JSON.parse(user));
                }
            } catch (error) {
                removeCookie(['access_token', 'refresh_token', 'user']);
                redirect && router.push('/auth/login');
            }
        };

        handler().finally(() => setLoading(false));
    }, []);

    return loading ? loader : children;
}

const getUser = async (token: string) => {
    try {
        const options = {
            url: `${process.env.BASE_API_URL}/auth/users/me/`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        }
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        return;
    }
}

const refreshAccessToken = async (token: string) => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/jwt/refresh/`,
        method: 'POST',
        data: {
            refresh: token
        }
    };

    try {
        const response = await axios.request(options);
        // await setCookie('access_token', response.data.access, response.data.access ? (jwtDecode(response.data.access)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0);
        // await setCookie('refresh_token', response.data.refresh, response.data.refresh ? (jwtDecode(response.data.refresh)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0);
        await setCookie('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
    }
};

const verifyToken = async (token: string): Promise<boolean> => {
    try {
        const options = {
            url: `${process.env.BASE_API_URL}/auth/users/jwt/verify/`,
            method: 'POST',
            data: { token }
        };
        await axios.request(options);
        return true;
    } catch (error) {
        return false;
    }
}

export default RevalidateUser;