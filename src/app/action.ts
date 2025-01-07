"use server";
import { urlGenerator } from "@/utils";
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