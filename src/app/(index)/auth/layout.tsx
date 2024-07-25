"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/context/AuthStore";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    const router = useRouter();

    React.useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    return isAuthenticated ? null : children
}

export default AuthLayout;