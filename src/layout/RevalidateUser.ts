"use client"
import { useAuthStore } from '@/context/AuthStore';
import { fetchUserData, verifyToken } from '@/server/action';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React from 'react';

const RevalidateUser = ({
    accessToken, refreshToken, user, loader, children
}: {
    accessToken: string | undefined,
    refreshToken: string | undefined,
    user: string | undefined,
    loader: React.ReactNode,
    children: React.ReactNode
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
        const handler = async (): Promise<any> => {
            try {
                if (!accessToken && !refreshToken) {
                    throw new Error('Invalid Token');
                }

                const token: boolean = (accessToken && refreshToken) ? await verifyToken(accessToken, refreshToken) : false;

                if (!token) {
                    throw new Error('Unauthorized');
                }

                if (!user && accessToken) {
                    const response = await fetchUserData(accessToken);
                    accessToken && refreshToken && loggedInUser(accessToken, refreshToken, response.data)
                    setCookie('user', JSON.stringify(response.data));
                }

                accessToken && refreshToken && user && loggedInUser(accessToken, refreshToken, JSON.parse(user));

            } catch (error) {
                deleteCookie('access_token');
                deleteCookie('refresh_token');
                deleteCookie('user');
                router.push('/auth/login');
            }
        };

        handler().finally(() => setLoading(false));
    }, []);

    return loading ? loader : children;
}

export default RevalidateUser;