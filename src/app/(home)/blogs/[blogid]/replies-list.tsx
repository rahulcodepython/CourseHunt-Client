"use client"
"use client"
import React from 'react'
import DeleteReply from './delete-reply'
import { useCommentStore } from '@/context/CommentStore'
import { useAuthStore } from '@/context/AuthStore'
import EditReply from './edit-reply'
import CreateReply from './create-reply'
import Image from 'next/image'

const RepliesList = ({ parent, parentIndex, blogid }: {
    parent: string,
    parentIndex: number,
    blogid: string | undefined
}) => {
    const comments = useCommentStore((state) => state.comments)
    const user = useAuthStore((state) => state.user)
    const isAuth = useAuthStore((state) => state.isAuthenticated)
    return (
        comments[parentIndex].children.map((child, index) => {
            return <article className="ml-12" key={index}>
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-4">
                        <p className="inline-flex items-center font-semibold text-sm">
                            <Image
                                width={24}
                                height={24}
                                className="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                alt="Jese Leos" />
                            {child.user}
                        </p>
                        <p className="text-sm">
                            {child.created_at}
                        </p>
                        {
                            user?.username === child.user && isAuth && <DeleteReply id={child.id} parent={parent} />
                        }
                        {
                            user?.username === child.user && isAuth && <EditReply data={child} parent={parent} />
                        }
                        {
                            isAuth && <CreateReply blogid={blogid} parent={parent} />
                        }
                    </div>
                </footer>
                <p>
                    {child.content}
                </p>
            </article>
        })
    )
}

export default RepliesList
