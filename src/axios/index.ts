import { Actions } from "@/context/AuthStore";
import axios from "axios";
import { Encrypt } from "@/utils";

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
        sessionStorage.setItem('access', Encrypt(response.data.access));
        localStorage.setItem('refresh', Encrypt(response.data.refresh));
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
