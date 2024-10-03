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

export const FormatDate = (isoString: string) => {
    const date = new Date(isoString);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

export const HMSToSeconds = (hours: number, minutes: number, seconds: number) => {
    return hours * 3600 + minutes * 60 + seconds;
}

export const SecondsToHMS = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return { hours, minutes, seconds };
}

export const FormatTime = (time: number) => {
    const { hours, minutes, seconds } = SecondsToHMS(time);
    return `${hours}h ${minutes}m ${seconds}s`
}