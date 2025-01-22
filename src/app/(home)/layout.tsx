import Navbar from "@/components/navbar";
import React from "react";
import { getAccessToken, getRefreshToken, isAuthenticated } from "../action";
import AddStateValues from "@/components/add-state-values";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
    const access = await getAccessToken();
    const refresh = await getRefreshToken();
    const isAuth = await isAuthenticated()

    return <main>
        {isAuth && <AddStateValues access={access} refresh={refresh} />}
        <Navbar />
        {children}
    </main>
}

export default HomeLayout;