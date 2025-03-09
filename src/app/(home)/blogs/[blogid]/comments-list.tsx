"use client"
import React from 'react'
import DeleteComment from './delete-comment'
import { useCommentStore } from '@/context/CommentStore'
import { useAuthStore } from '@/context/AuthStore'
import RepliesList from './replies-list'
import EditComment from './edit-comment'
import CreateReply from './create-reply'

const CommentsList = ({ blogid }: {
    blogid: string | undefined
}) => {
    const comments = useCommentStore((state) => state.comments)
    const user = useAuthStore((state) => state.user)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    return (
        <div className='flex flex-col gap-6 first:pt-6'>
            {
                comments.map((item, index) => {
                    return <div className="flex flex-col gap-4 first:pt-6" key={index}>
                        <article className="">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-4">
                                    <p className="inline-flex items-center font-semibold text-sm">
                                        <img
                                            width={24}
                                            height={24}
                                            className="mr-2 w-6 h-6 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                            alt="Michael Gough" />
                                        {item.user}
                                    </p>
                                    <p className="text-sm">
                                        {item.created_at}
                                    </p>
                                    {
                                        user?.username === item.user && isAuthenticated && <DeleteComment id={item.id} />
                                    }
                                    {
                                        user?.username === item.user && isAuthenticated && <EditComment data={item} />
                                    }
                                    {
                                        isAuthenticated && <CreateReply blogid={blogid} parent={item.id} />
                                    }
                                </div>
                            </footer>
                            <p>
                                {item.content}
                            </p>
                        </article>
                        {
                            item.children.length > 0 && <RepliesList parent={item.id} parentIndex={index} blogid={blogid} />
                        }
                    </div>
                })
            }
        </div>
    )
}

export default CommentsList
