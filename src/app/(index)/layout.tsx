"use client";
import React, { useEffect, useState } from 'react';
import { Decrypt } from '@/utils';
import { RefreshAccessToken } from '@/axios';
import Loading from '@/components/Loading';
import { Actions, useAuthStore } from '@/context/AuthStore';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation';

const queryClient = new QueryClient();

const IndexLayout = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();
    const pathname = usePathname();

    const updateUser = useAuthStore((state) => state.UpdateUser)
    const loggedInUser = useAuthStore((state) => state.LoggedInUser)
    const loggedOutUser = useAuthStore((state) => state.LogoutUser)
    const verifyToken = useAuthStore((state) => state.VerifyToken)

    useEffect(() => {
        const handler = async () => {
            const isRefreshTokenExists = localStorage.getItem("refresh") ?? null;
            const refresh_token = isRefreshTokenExists ? Decrypt(localStorage.getItem("refresh")) : null;

            const isValidateRefreshToken = refresh_token ? await verifyToken(refresh_token) : null;

            if (!isValidateRefreshToken) {
                loggedOutUser();
                if (pathname.includes('/user')) {
                    router.push('/auth/login');
                }
            } else {
                const isAccessTokenExists = sessionStorage.getItem("access") ?? null;
                const access_token = isAccessTokenExists ? Decrypt(sessionStorage.getItem("access")) : null;

                const isValidateAccessToken = access_token ? await verifyToken(access_token) : null;

                if (!isValidateAccessToken) {
                    await RefreshAccessToken(refresh_token, loggedInUser, updateUser);
                } else {
                    const isUserExists = localStorage.getItem("user") ?? null;
                    const user = isUserExists ? JSON.parse(localStorage.getItem("user") ?? '{}') : null;
                    access_token && refresh_token && loggedInUser(access_token, refresh_token, user);
                }

                if (pathname.includes('/auth')) {
                    router.push('/user');
                }
            }
            setLoading(false);
        };
        handler();
    }, []);

    return loading ? <Loading /> : <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}

export default IndexLayout;