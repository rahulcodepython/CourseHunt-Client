'use server'
import axios from "axios";
import { cookies } from "next/headers";

export const getCookies = async (cookies_list: Array<string>): Promise<{ [key: string]: string | undefined }> => {
    const cookieStore = await cookies();
    const required_cookies: { [key: string]: string | undefined } = {};
    cookies_list.map(cookie => required_cookies[cookie] = cookieStore.get(cookie)?.value);
    return required_cookies;
}

export const setCookie = async (cookie_name: string, cookie_value: string, maxAge?: number) => {
    (await cookies()).set(cookie_name, cookie_value, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: maxAge
    });
}

export const removeCookie = async (cookies_list: Array<string>) => {
    const cookieStore = await cookies();
    cookies_list.forEach(cookie => {
        cookieStore.delete(cookie);
    });
    return;
}