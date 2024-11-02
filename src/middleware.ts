import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = '/user';
const AUTH_ROUTES = '/auth';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const accessToken: RequestCookie | undefined = req.cookies.get('access_token');
    const refreshToken: RequestCookie | undefined = req.cookies.get('refresh_token');

    if (accessToken || refreshToken) {
        if (pathname.startsWith(AUTH_ROUTES)) {
            return NextResponse.redirect(new URL('/', req.url));
        } else {
            return NextResponse.next();
        }
    } else {
        if (pathname.startsWith(PROTECTED_ROUTES)) {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        } else {
            return NextResponse.next();
        }
    }
}

export const config = {
    matcher: ['/auth/:path*', '/user/:path*'],
};
