import Loading from "@/components/Loading";
import RevalidateUser from "@/layout/RevalidateUser";
import { getAuthCookies } from "@/server/action";
import React from "react";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
    const { access, refresh, user } = await getAuthCookies();

    return <RevalidateUser accessToken={access} refreshToken={refresh} user={user} loader={<Loading />}>
        {children}
    </RevalidateUser>
}

export default UserLayout;