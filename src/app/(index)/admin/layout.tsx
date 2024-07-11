"use client"
import React from "react";
import {AuthContext, AuthContextType} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

const AdminLayout = ({ children }: {children: React.ReactNode}) => {
    const authContext: AuthContextType | undefined = React.useContext(AuthContext);
    const isAuthenticated: boolean | undefined = authContext?.isAuthenticated;

    const router = useRouter();

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
        }
    }, [isAuthenticated]);

    return !isAuthenticated ? null : <div>
        <h1>Admin Layout</h1>
        {children}
        </div>
}

export default AdminLayout;