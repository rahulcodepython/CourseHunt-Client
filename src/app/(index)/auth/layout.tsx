"use client"
import React from "react";
import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const authContext: AuthContextType | undefined = React.useContext(AuthContext);
    const isAuthenticated: boolean | undefined = authContext?.isAuthenticated;

    const router = useRouter();

    React.useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated]);

    return isAuthenticated ? null : children
}

export default AuthLayout;