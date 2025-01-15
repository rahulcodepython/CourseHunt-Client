"use client"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { AccessTokenUserType, UserType } from "@/types";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const handleUploadFile = async (file: File | null): Promise<string | undefined> => {
    if (!file) {
        return undefined;
    }
    try {
        const storageRef = ref(storage, `CourseHunt/${file.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        return await getDownloadURL(uploadTask.ref);

    } catch (error) {
        return undefined;
    }
};

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

export const getUser = (token: string | undefined): UserType | null => {
    try {
        if (!token) {
            return null;
        }
        const decoded = decodeJwtToken(token);
        return decoded as UserType;
    } catch (error) {
        return null;
    }
}