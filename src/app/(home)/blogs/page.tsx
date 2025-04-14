import React from "react";
import { ListBlogsType, PaginationType } from "@/types";
import { getAccessToken, isAuthenticated } from "@/app/action";
import { serverUrlGenerator } from "@/utils";
import BlogsList from "./blog-list";
import Section from "@/components/section";

const Blogs = async () => {
    const access = await getAccessToken();
    const isAuth = await isAuthenticated();
    const response = await fetch(serverUrlGenerator(`/blogs/list/`), {
        method: 'GET',
        cache: 'no-store',
        headers: isAuth ? {
            'Authorization': `Bearer ${access}`
        } : {}
    })
    const data: PaginationType<ListBlogsType> = await response.json()

    return <Section className="my-12">
        <BlogsList data={data} isAuth={isAuth} access={access} />
    </Section>
}

export default Blogs;