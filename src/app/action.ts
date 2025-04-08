"use server";
import { AccessTokenUserType, SignInFormType, UserType } from "@/types";
import { checkTokenExpiry, decodeJwtToken, serverUrlGenerator } from "@/utils";
import { cookies } from "next/headers";

export const setCookie = async (cookie_name: string, cookie_value: string, maxAge?: number) => {
    (await cookies()).set(cookie_name, cookie_value, { maxAge: maxAge });
}

export const getAccessToken = async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get("access")?.value;
}

export const getRefreshToken = async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get("refresh")?.value;
}

export const fetchNewTokens = async (token: string) => {
    const options = {
        method: "POST",
        cache: "no-store" as RequestCache,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "refresh": token
        }),
    };

    try {
        const response = await fetch(serverUrlGenerator("auth/users/jwt/refresh/"), options);
        const result = await response.json();

        const cookieStore = await cookies();
        cookieStore.set("access", result.access, { maxAge: 60 * 60 * 24 });
        cookieStore.set("refresh", result.refresh, { maxAge: 60 * 60 * 24 * 4 });
        return true;
    } catch (error) {
        return false;
    }
};

export const getUser = async (): Promise<UserType | null> => {
    const token = await getAccessToken();

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

export const isAuthenticated = async (): Promise<boolean> => {
    const token = await getAccessToken();

    if (!token) {
        return false;
    }

    const decoded = decodeJwtToken(token) as AccessTokenUserType | null;
    if (!decoded) {
        return false;
    }

    return !checkTokenExpiry(decoded.exp);
}

export const revalidateTokens = async (): Promise<boolean> => {
    const refresh = await getRefreshToken();

    if (!refresh) {
        return false;
    }

    const decoded = decodeJwtToken(refresh) as AccessTokenUserType | null;
    if (!decoded) {
        return false;
    }

    if (checkTokenExpiry(decoded.exp)) {
        return false;
    }

    return await fetchNewTokens(refresh as string);
}

export const loginUser = async (uid: string, token: string) => {
    try {
        const response = await fetch(serverUrlGenerator('/auth/users/jwt/create/'), {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            cache: 'no-store',
            body: JSON.stringify({
                uid: uid,
                token: token
            }),
        });
        const data = await response.json();
        const access = data.access;
        const refresh = data.refresh;

        const cookieStore = await cookies();
        cookieStore.set("access", access, { maxAge: 60 * 60 * 24 });
        cookieStore.set("refresh", refresh, { maxAge: 60 * 60 * 24 * 4 });
        return true;
    } catch (error) {
        return false;
    }
}

export const signInAction = async (formData: SignInFormType) => {
    return await fetch(serverUrlGenerator('/auth/users/jwt/create/'), {
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
            return true;
        }).catch(() => {
            return false;
        });
};


export const registerUser = async (uid: string, token: string) => {
    return await fetch(serverUrlGenerator('/auth/users/activate/'), {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            uid: uid,
            tokne: token
        }),
    })
        .then(response => response.json())
        .then(async (response) => {
            const access = response.access;
            const refresh = response.refresh;

            const cookieStore = await cookies();
            cookieStore.set("access", access, { maxAge: 60 * 60 * 24 });
            cookieStore.set("refresh", refresh, { maxAge: 60 * 60 * 24 * 4 });
            return true
        })
        .catch(async (error) => {
            return false;
        });
}
