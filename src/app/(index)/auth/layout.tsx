// "use client"
import React from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/context/AuthStore";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    // const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    // const user = useAuthStore((state) => state.user)

    // const router = useRouter();

    // if (isAuthenticated) {
    //     return router.push(`/user/${user?.username}`);
    // }

    return children
}

export default AuthLayout;