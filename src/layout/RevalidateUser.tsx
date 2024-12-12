"use client"
import { useAuthStore } from '@/context/AuthStore';
import { refreshAccessToken, removeCookie, setCookie, verifyToken, } from '@/server/action';
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
                if (!accessToken && !refreshToken) {
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
                            accessToken && refreshToken && loggedInUser(response.access, refreshToken, response.user)
                            return;
                        }
                        else {
                            throw new Error('Invialid Refresh Token');
                        }
                    }
                }

                if (user === undefined && accessToken) {
                    const response = await getUser(accessToken);

                    if (response) {
                        accessToken && refreshToken && loggedInUser(accessToken, refreshToken, response.data)
                        setCookie('user', JSON.stringify(response.data));
                        return;
                    }
                    else {
                        throw new Error('Invalid User');
                    }
                }
                accessToken && refreshToken && user && loggedInUser(accessToken, refreshToken, JSON.parse(user));
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
        return await axios.request(options);
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
}

export default RevalidateUser;