"use client"
import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/context/AuthStore";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const router = useRouter();

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }
    }, [isAuthenticated, router]);

    return !isAuthenticated ? null : children
}

export default UserLayout;