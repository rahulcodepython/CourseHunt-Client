"use server";
import { ApiResponseType, SignInFormType } from "@/types";
import { handleApiError, handleApiResponse, urlGenerator } from "@/utils";
import { cookies } from "next/headers";

export const getAccessToken = async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get("access")?.value;
}

export const getRefreshToken = async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get("access")?.value;
}

export const fetchNewTokens = async (token: string) => {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "refresh": token
        }),
    };

    try {
        const response = await fetch(urlGenerator("auth/users/jwt/refresh/"), options);
        const result = await response.json();

        const cookieStore = await cookies();
        cookieStore.set("access", result.access, { maxAge: 60 * 60 * 24 });
        cookieStore.set("refresh", result.refresh, { maxAge: 60 * 60 * 24 * 4 });
        return true;
    } catch (error) {
        return false;
    }
};

export const initLoginUser = async (formData: SignInFormType): Promise<ApiResponseType> => {
    return await fetch(urlGenerator('/auth/users/login/email/'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then(async (response) => {
            return await handleApiResponse(response);
        })
        .catch(async (error) => {
            return await handleApiError(error);
        }) as ApiResponseType;
}

export const signInAction = async (formData: SignInFormType): Promise<ApiResponseType> => {
    return await fetch(urlGenerator('/auth/users/jwt/create/'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then(async (response) => {
            const access = response.access;
            const refresh = response.refresh;

            const cookieStore = await cookies();
            cookieStore.set("access", access, { maxAge: 60 * 60 * 24 }); //
            cookieStore.set("refresh", refresh, { maxAge: 60 * 60 * 24 * 4 });
            return { status: 200, data: { success: "Successfully signed in" } };
        })
        .catch(async (error) => {
            return await handleApiError(error);
        }) as ApiResponseType;
};