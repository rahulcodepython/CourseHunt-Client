import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import BlogForm from '../blog-form'

const CreateBlog = () => {
    return (
        <Card className="mx-28 my-10">
            <CardHeader>
                <h2 className="text-xl font-semibold">Create Blogs</h2>
            </CardHeader>
            <CardContent>
                <BlogForm />
            </CardContent>
        </Card>
    )
}

export default CreateBlog
