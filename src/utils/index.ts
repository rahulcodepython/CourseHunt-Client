import { State } from "@/context/AuthStore";

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