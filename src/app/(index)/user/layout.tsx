"use client"
import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/context/AuthStore";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const router = useRouter();

    if (!isAuthenticated) {
        return router.push("/auth/login");
    }

    return children
}

export default UserLayout;