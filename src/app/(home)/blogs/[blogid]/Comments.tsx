"use client"
import { DetailBlogsCommentType, DetailBlogsType, UserType } from '@/types'
import React from 'react'
import CreateCommentForm from './create-comment-form'
import CommentsList from './comments-list'
import { useCommentStore } from '@/context/CommentStore'

const Comments = ({ data, blogid }: {
    data: DetailBlogsType,
    blogid: string | undefined
}) => {
    const totalComments = useCommentStore((state) => state.totalComments)
    const setComments = useCommentStore((state) => state.setComments)

    React.useEffect(() => {
        setComments(data.comment)
    }, [data.comment, setComments])

    return (
        <section className="not-format">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">
                    Comments ({totalComments})
                </h2>
            </div>
            <CreateCommentForm blogid={blogid} />
            <CommentsList blogid={blogid} />
        </section>
    )
}

export default Comments
