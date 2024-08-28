import { Actions } from "@/context/AuthStore";
import axios from "axios";
import { Encrypt } from "@/utils";

export const RefreshAccessToken = async (
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
        loggedInUser(response.data.access, response.data.refresh, response.data.user);
        sessionStorage.setItem('access', Encrypt(response.data.access));
        localStorage.setItem('refresh', Encrypt(response.data.refresh));
        localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
        return;
    }
};