'use server'
import { CuponCodeFormDataType } from "@/app/(index)/dashboard/[username]/admin/cupone-codes/CreateCuponeCodeForm";
import { AllCourseType, InitialLoginValuesType, UserType } from "@/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";


export const refreshAccessToken = async (token: string): Promise<{
    data: string,
    access?: string;
    refresh?: string;
    user?: UserType;
}> => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/jwt/refresh/`,
        method: 'POST',
        data: {
            refresh: token
        }
    };

    try {
        const response = await axios.request(options);
        (await cookies()).set('access_token', response.data.access, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: response.data.access ? (jwtDecode(response.data.access)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0  // Access token expiry
        });
        (await cookies()).set('refresh_token', response.data.refresh, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: response.data.refresh ? (jwtDecode(response.data.refresh)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0  // Access token expiry
        });
        (await cookies()).set('user', JSON.stringify(response.data.user), {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',  // Access token expiry
        });
        return { 'data': 'Login successful', access: response.data.access, refresh: response.data.refresh, user: response.data.user };
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
};

export const verifyToken = async (token: string): Promise<boolean> => {
    try {
        const options = {
            url: `${process.env.BASE_API_URL}/auth/users/jwt/verify/`,
            method: 'POST',
            data: { token }
        };

        await axios.request(options);
        return true;
    } catch (error) {
        return false;
    }
}

export const fetchUserData = async (token: string) => {
    const options = {
        url: `${process.env.BASE_API_URL}/users/user/`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET'
    }

    return await axios.request(options);
}

export const loginUser = async (data: InitialLoginValuesType): Promise<{
    data: string,
    access?: string;
    refresh?: string;
    user?: string;
}> => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/jwt/create/`,
        method: 'POST',
        data: data
    };

    try {
        const response = await axios.request(options);
        (await cookies()).set('access_token', response.data.access, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: response.data.access ? (jwtDecode(response.data.access)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0  // Access token expiry
        });
        (await cookies()).set('refresh_token', response.data.refresh, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: response.data.refresh ? (jwtDecode(response.data.refresh)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0  // Access token expiry
        });
        (await cookies()).set('user', JSON.stringify(response.data.user), {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',  // Access token expiry
        });
        return { 'data': 'Login successful', access: response.data.access, refresh: response.data.refresh, user: response.data.user };
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
}

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

export const createCourse = async (data: AllCourseType, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/create-course/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
        data: data,
    }
    try {
        await axios.request(options)
        return { 'data': 'Course created successfully' };
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
}

export const editCourse = async (courseid: string | undefined, data: AllCourseType, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/edit-course/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "PATCH",
        data: data,
    }
    try {
        await axios.request(options)
        return { 'data': 'Course updated successfully' };
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
}

export const enrollCourse = async (courseid: string | undefined, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/purchase-course/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
    }
    try {
        await axios.request(options)
        return { 'data': 'Course enrolled successfully' };
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
}

export const deleteCourse = async (courseid: string | undefined, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/edit-course/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "DELETE",
    }
    try {
        await axios.request(options)
        return { 'data': 'Course deleted successfully' };
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
}

export const createCouponCode = async (data: CuponCodeFormDataType, access_token: string | null) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/create-coupon-code/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
        data: data,
    }
    try {
        await axios.request(options)
        return { 'data': 'Coupon code created successfully' };
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
}

export const editCouponCode = async (data: CuponCodeFormDataType, access_token: string | null, id: number) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/edit-coupon-code/${id}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
        data: data,
    }
    try {
        await axios.request(options)
        return { 'data': 'Coupon code edited successfully' };
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
}

export const deleteCouponCode = async (access_token: string | undefined, id: number) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/edit-coupon-code/${id}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "DELETE",
    }
    try {
        await axios.request(options)
        return { 'data': 'Coupon code deleted successfully' };
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
}

export const toggleCourseStatus = async (courseid: string | undefined, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/course/toggle-course-status/${courseid}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "POST",
    }
    try {
        await axios.request(options)
        return { 'data': 'Course status toggled successfully' };
    } catch (error) {
        return { 'data': 'An error occurred' };
    }
}