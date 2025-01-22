import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import axios from 'axios'
import { getAccessToken } from '@/app/action'
import { serverUrlGenerator } from '@/utils'
import BlogForm from '../../blog-form'

const BlogEdit = async ({ params }: { params: Promise<{ blogid: string | undefined }> }) => {
    const blogid = (await params).blogid
    const access_token = await getAccessToken()

    const response = await axios.get(serverUrlGenerator(`/blogs/update/${blogid}/`), {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    })
    const data: {
        id: string
        title: string
        content: string
        image: string
    } = await response.data

    return (
        <Card className="mx-28 my-10">
            <CardHeader>
                <h2 className="text-xl font-semibold">Edit Blogs</h2>
            </CardHeader>
            <CardContent>
                <BlogForm edit data={data} id={data.id} />
            </CardContent>
        </Card>
    )
}

export default BlogEdit
