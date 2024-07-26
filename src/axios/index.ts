import { InitialLoginValuesType } from "@/app/(index)/auth/login/page";
import { Actions } from "@/context/AuthStore";
import axios from "axios";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import { Encrypt } from "@/utils";

export const VerifyToken = async (token: string): Promise<boolean> => {
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

export const RefreshTheAccessToken = async (
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
        setCookie('access', Encrypt(response.data.access), { path: '/' });
        setCookie('refresh', Encrypt(response.data.refresh), { path: '/' });
    } catch (error) {
        return;
    }
};

export const FetchUserData = async (
    token: string | null,
    updateUser: Actions['UpdateUser'],
): Promise<void> => {
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        url: `${process.env.BASE_API_URL}/auth/users/me/`,
        method: 'GET'
    };
    try {
        const response = await axios.request(options);
        updateUser(response.data);
    } catch (error) {
        updateUser(null);
    }
};

export const LogIn = async (
    values: InitialLoginValuesType,
    loggedInUser: Actions['LoggedInUser'],
    updateUser: Actions['UpdateUser'],
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    router: any,
) => {
    try {
        const response = await axios.post(`${process.env.BASE_API_URL}/auth/users/jwt/create/`, values);
        await loggedInUser(response.data.access, response.data.refresh);
        await FetchUserData(response.data.access, updateUser)
        setCookie('access', Encrypt(response.data.access), { path: '/' });
        setCookie('refresh', Encrypt(response.data.refresh), { path: '/' });
        router.push('/');
        toast.success('You are logged in.');
    } catch (error: any) {
        toast.error(error?.response?.data?.error ?? 'Something went wrong');
    } finally {
        setLoading(false);
    }
};