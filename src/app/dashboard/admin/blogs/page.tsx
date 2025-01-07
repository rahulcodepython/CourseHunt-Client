import * as React from "react"
import { AdminListBlogsType, PaginationType } from "@/types"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import axios from "axios";
import BlogsTable from "./BlogsTable";
import { getAccessToken } from "@/app/action";

const BlogsPage = async () => {
    const access_token = await getAccessToken()
    const response = await axios.get(`${process.env.BASE_API_URL_SERVER}/blogs/list-admin/`, {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    })
    const data: PaginationType<AdminListBlogsType> = await response.data

    const columnList = [
        "Title",
        "Created",
        "Updated",
        "Likes",
        "Views",
        "Comments",
    ];

    return <div className="w-full p-4">
        <Card>
            <CardHeader className="flex-row justify-between">
                <div className="flex items-center justify-between py-4 w-full">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>
                            All Blogs
                        </CardTitle>
                        <CardDescription>
                            List of all blogs.
                        </CardDescription>
                    </div>
                    {
                        <Link href={`/dashboard/admin/blogs/create-blog/`}>
                            <Button>
                                Create Blog
                            </Button>
                        </Link>
                    }
                </div>
            </CardHeader>
            <BlogsTable data={data} columnList={columnList} />
        </Card>
    </div>
}

export default BlogsPage