'use server'
import { InitialLoginValuesType } from "@/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


export const refreshAccessToken = async (token: string) => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/jwt/refresh/`,
        method: 'POST',
        data: {
            refresh: token
        }
    };
    return await axios.request(options);
};

export const verifyToken = async (access: string, refresh: string): Promise<boolean> => {
    try {
        const options = {
            url: `${process.env.BASE_API_URL}/auth/users/jwt/verify/`,
            method: 'POST',
            data: { access, refresh }
        };

        await axios.request(options);
        return true;
    } catch (error) {
        return false;
    }
}

export const fetchUserData = async (token: string) => {
    const options = {
        url: `${process.env.BASE_API_URL}/users/user/`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET'
    }

    return await axios.request(options);
}

export const loginUser = async (data: InitialLoginValuesType) => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/jwt/create/`,
        method: 'POST',
        data: data
    };

    try {
        const response = await axios.request(options);
        cookies().set('access_token', response.data.access, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: response.data.access ? (jwtDecode(response.data.access)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0  // Access token expiry
        });
        cookies().set('refresh_token', response.data.refresh, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: response.data.refresh ? (jwtDecode(response.data.refresh)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0  // Access token expiry
        });
        cookies().set('user', JSON.stringify(response.data.user), {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',  // Access token expiry
        });
        return { 'data': 'Login successful', access: response.data.access, refresh: response.data.refresh, user: response.data.user };
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
}

export const getAuthCookies = async (): Promise<{
    access: string | undefined,
    refresh: string | undefined,
    user: string | undefined
}> => {
    const cookieStore = cookies();
    return {
        access: cookieStore.get('access_token')?.value,
        refresh: cookieStore.get('refresh_token')?.value,
        user: cookieStore.get('user')?.value
    }
}