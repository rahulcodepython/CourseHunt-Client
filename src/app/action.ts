"use server";
import { ApiResponseType, SignInFormType, SignUpFormType } from "@/types";
import { handleApiError, handleApiResponse, serverUrlGenerator } from "@/utils";
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

export const initLoginUser = async (formData: SignInFormType): Promise<ApiResponseType> => {
    return await fetch(serverUrlGenerator('/auth/users/login/email/'), {
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

export const resendLoginOTP = async (email: string): Promise<ApiResponseType> => {
    return await fetch(serverUrlGenerator('/auth/users/login/email/resend/'), {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
    })
        .then(response => response.json())
        .then(async (response) => {
            return await handleApiResponse(response);
        })
        .catch(async (error) => {
            return await handleApiError(error);
        }) as ApiResponseType;
}

export const loginUser = async (uid: string, token: string): Promise<ApiResponseType> => {
    return await fetch(serverUrlGenerator('/auth/users/jwt/create/'), {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            uid: uid,
            token: token
        }),
    })
        .then(response => response.json())
        .then(async (response) => {
            const access = response.access;
            const refresh = response.refresh;

            const cookieStore = await cookies();
            cookieStore.set("access", access, { maxAge: 60 * 60 * 24 });
            cookieStore.set("refresh", refresh, { maxAge: 60 * 60 * 24 * 4 });
            return { status: 200, data: response.data };
        })
        .catch(async (error) => {
            return await handleApiError(error);
        }) as ApiResponseType;
}

export const signInAction = async (formData: SignInFormType): Promise<ApiResponseType> => {
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
            return { status: 200, data: { success: "Successfully signed in" } };
        })
        .catch(async (error) => {
            return await handleApiError(error);
        }) as ApiResponseType;
};

export const initRegisterUser = async (data: SignUpFormType): Promise<ApiResponseType> => {
    return await fetch(serverUrlGenerator('/auth/users/me/'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then(async (response) => {
            return await handleApiResponse(response);
        })
        .catch(async (error) => {
            console.log(JSON.stringify(error));

            return await handleApiError(error);
        }) as ApiResponseType;
}

export const registerUser = async (uid: string, token: string): Promise<ApiResponseType> => {
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
            return { status: 200, data: response.data };
        })
        .catch(async (error) => {
            return await handleApiError(error);
        }) as ApiResponseType;
}

export const resendRegisterOTP = async (email: string) => {
    return await fetch(serverUrlGenerator('/auth/users/activate/email/resend/'), {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
    })
        .then(response => response.json())
        .then(async (response) => {
            return await handleApiResponse(response);
        })
        .catch(async (error) => {
            return await handleApiError(error);
        }) as ApiResponseType;
}