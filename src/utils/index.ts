import { State } from "@/context/AuthStore";

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