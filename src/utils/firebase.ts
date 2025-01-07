"use client"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

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