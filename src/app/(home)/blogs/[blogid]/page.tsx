import { DetailBlogsType } from '@/types'
import { Eye } from 'lucide-react'
import React from 'react'
import Comments from './Comments'
import BlogLike from './BlogLike'
import Markdown from 'react-markdown'
import { getAccessToken } from '@/app/action'
import { getUser, isAuthenticated, urlGenerator } from '@/utils'

const BlogSingle = async ({ params }: { params: Promise<{ blogid: string | undefined }> }) => {
    const access = await getAccessToken()
    const isAuth = isAuthenticated(access)
    const user = getUser(access)
    const blogid = (await params).blogid

    const response = await fetch(urlGenerator(`/blogs/read/${blogid}`), isAuth ? {
        headers: {
            Authorization: `Bearer ${access}`
        }
    } : {})
    const data: DetailBlogsType = await response.json()

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
                    <Comments data={data} isAuth={isAuth} access={access} user={user} />
                </article>
            </div>
        </section>
    )
}

export default BlogSingle
