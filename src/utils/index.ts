import { Actions, State } from "@/context/AuthStore";
import axios from "axios";

export const Decrypt = (token: State['accessToken'], key: String | undefined) => {
    let decryptedToken = '';
    if (token && key) {
        for (let i = 0; i < token?.length; i++) {
            decryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
    }
    return decryptedToken;
}

export const Encrypt = (token: State['accessToken'], key: String | undefined) => {
    let encryptedToken = '';
    if (token && key) {
        for (let i = 0; i < token?.length; i++) {
            encryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
    }
    return encryptedToken;
}

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