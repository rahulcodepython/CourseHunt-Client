'use client'

import { useAuthStore } from "@/context/AuthStore";
import RevalidateUser from "@/layout/RevalidateUser";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserIcon } from "lucide-react";

const AuthNavSection = (
    { accessToken, refreshToken, userData }:
        {
            accessToken: string | undefined,
            refreshToken: string | undefined,
            userData: string | undefined
        }
) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);

    return <RevalidateUser accessToken={accessToken} refreshToken={refreshToken} user={userData} loader={<UnAuthenticatedView />}>
        {
            isAuthenticated ? <div className="flex items-center gap-4">
                {
                    user?.is_superuser ? <Link href={`/user/${user.username}/admin`} prefetch={false}>
                        <Button variant="outline" size="sm">
                            Admin
                        </Button>
                    </Link> : null
                }
                <Link href={`/user/${user?.username}`} className="border rounded-full p-2 cursor-pointer">
                    <UserIcon />
                </Link>
            </div> : <UnAuthenticatedView />
        }
    </RevalidateUser>
}

const UnAuthenticatedView: React.FC = () => {
    return <div className="flex items-center gap-4">
        <Link href={'/auth/login'} prefetch={false}>
            <Button variant="outline" size="sm">
                Sign in
            </Button>
        </Link>
        <Link href={'/auth/register'} prefetch={false}>
            <Button size="sm">Sign up</Button>
        </Link>
    </div>
}

export default AuthNavSection;