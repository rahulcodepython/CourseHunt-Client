import { AccessToken, UserType } from "@/context/AuthContext";
import React from "react";
import axios from "axios";

export const Decrypt = (token: AccessToken, key: String | undefined) => {
    let decryptedToken = '';
    if (token && key) {
        for (let i = 0; i < token?.length; i++) {
            decryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
    }
    return decryptedToken;
}

export const Encrypt = (token: AccessToken, key: String | undefined) => {
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
    setUser: React.Dispatch<React.SetStateAction<UserType | null>> | undefined
): Promise<void> => {
    const options = {
        headers: {
            Authorization: `JWT ${token}`
        },
        url: `${process.env.BASE_API_URL}/auth/users/me/`,
        method: 'GET'
    };
    try {
        const response = await axios.request(options);
        setUser?.(response.data);
        return;
    } catch (error) {
        return;
    }
};