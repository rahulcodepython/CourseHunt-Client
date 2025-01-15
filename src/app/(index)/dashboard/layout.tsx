import Loading from "@/components/Loading";
import RevalidateUser from "@/layout/RevalidateUser";
import { getCookies } from "@/server/action";
import React from "react";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
    const { access_token, refresh_token, user } = await getCookies(['access_token', 'refresh_token', 'user']);

    return <RevalidateUser accessToken={access_token} refreshToken={refresh_token} user={user} loader={<Loading />}>
        {children}
    </RevalidateUser>
}

export default UserLayout;