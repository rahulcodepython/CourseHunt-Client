import { AccessTokenUserType } from '@/types';

export const checkTokenExpiry = (exp: number): boolean => {
    const currentTime = Math.floor(Date.now() / 1000);
    return exp <= currentTime;
}

export const serverUrlGenerator = (url: string) => {
    return `${process.env.BASE_API_URL_SERVER}${url}`;
}

export const clientUrlGenerator = (url: string) => {
    return `${process.env.BASE_API_URL}${url}`;
}

export const decodeJwtToken = (token: string): AccessTokenUserType | null => {
    try {
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('Invalid JWT token');
        }

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(char => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}
