import { DetailBlogsType } from '@/types'
import axios from 'axios'
import { Eye } from 'lucide-react'
import React from 'react'
import Comments from './Comments'
import BlogLike from './BlogLike'
import { getCookies } from '@/server/action'
import Markdown from 'react-markdown'

const BlogSingle = async ({ params }: { params: Promise<{ blogid: string | undefined }> }) => {
    const { access_token } = await getCookies(['access_token'])
    const blogid = (await params).blogid

    const response = await axios.get(`${process.env.BASE_API_URL_SERVER}/blogs/read/${blogid}`, access_token ? {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    } : {})
    const data: DetailBlogsType = await response.data

    return (
        <section className="py-24">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
                <article className="mx-auto w-full max-w-4xl">
                    <header className="mb-12">
                        <div className='flex flex-col gap-4'>
                            <h1 className="text-3xl font-extrabold leading-tight w-full text-center">
                                {data.title}
                            </h1>
                            <div className='flex items-center justify-end gap-4 text-sm'>
                                <span>
                                    by Rahul Das
                                </span>
                                <span className='flex items-center gap-2'>
                                    Created: {data.created_at}
                                </span>
                                <span className='flex items-center gap-2'>
                                    Updated: {data.updated_at}
                                </span>
                                <BlogLike data={data} />
                                <span className='flex items-center gap-2'>
                                    <Eye className="w-4 h-4" /> {data.read}
                                </span>
                            </div>
                        </div>
                    </header>
                    <div className="lead mb-16 prose prose-sm">
                        <Markdown>
                            {data.content}
                        </Markdown>
                    </div>
                    <Comments data={data} />
                </article>
            </div>
        </section>
    )
}

export default BlogSingle
