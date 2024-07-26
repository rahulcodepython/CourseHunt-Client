import { State } from "@/context/AuthStore";
import { CookieValueTypes } from "cookies-next";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

export const Decrypt = (token: State['accessToken' | 'refreshToken']) => {
    let decryptedToken = '';
    if (token && ENCRYPTION_KEY) {
        for (let i = 0; i < token?.length; i++) {
            decryptedToken += String.fromCharCode(token.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
        }
    }
    return decryptedToken;
}

export const Encrypt = (token: State['accessToken' | 'refreshToken']) => {
    let encryptedToken = '';
    if (token && ENCRYPTION_KEY) {
        for (let i = 0; i < token?.length; i++) {
            encryptedToken += String.fromCharCode(token.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length));
        }
    }
    return encryptedToken;
}

export const GetDecryptedToken = (token: RequestCookie | CookieValueTypes | undefined) => {
    let value = '';

    if (token) {
        if (typeof token === 'object' && 'value' in token) {
            value = token.value;
        } else {
            value = token.toString();
        }
    }

    return token ? Decrypt(value) : null;
}