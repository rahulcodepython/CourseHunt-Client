import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUser, isAuthenticated, revalidateTokens } from "./app/action";

const AUTH_ROUTE = '/auth';
const PROTECTED_ROUTE = '/dashboard';
const ADMIN_ROUTE = '/dashboard/admin';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const redirectAdminUser = async () => {
        const user = await getUser();

        if (pathname.startsWith(ADMIN_ROUTE) && !user?.is_superuser) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    const redirectAuthenticateUser = async () => {
        if (pathname.startsWith(AUTH_ROUTE)) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return await redirectAdminUser();
    }

    const redirectUnauthenticateUser = () => {
        if (pathname.startsWith(PROTECTED_ROUTE)) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        return NextResponse.next();
    }

    const auth: boolean = await isAuthenticated();

    if (!auth) {
        const tokens = await revalidateTokens();

        if (!tokens) {
            const cookieStore = await cookies();
            cookieStore.delete('access');
            cookieStore.delete('refresh');

            return redirectUnauthenticateUser();
        }

        return await redirectAuthenticateUser();
    }

    return await redirectAuthenticateUser();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
