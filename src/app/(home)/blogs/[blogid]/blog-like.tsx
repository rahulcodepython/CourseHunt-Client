"use client"
import { useAuthStore } from '@/context/AuthStore'
import { clientUrlGenerator } from '@/utils'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { Heart } from 'lucide-react'
import React from 'react'

const BlogLike = ({ data }: {
    data: {
        likes: number
        id: string
        liked: boolean
    },
}) => {
    const [likes, setLikes] = React.useState(data.likes)
    const [isLiked, setIsLiked] = React.useState(data.liked)

    const isAuth = useAuthStore((state) => state.isAuthenticated)
    const access = useAuthStore((state) => state.accessToken)

    const likeBlog = async (id: string) => {
        if (!isAuth) return

        try {
            const options = {
                headers: {
                    Authorization: `Bearer ${access}`
                },
                url: clientUrlGenerator(`/blogs/like-blog/${id}/`),
                method: 'POST'
            }
            const response = await axios.request(options)
            const data = await response.data

            if (data.liked) {
                setLikes(likes + 1)
                setIsLiked(true)
            } else {
                setLikes(likes - 1)
                setIsLiked(false)
            }
        } catch {
        }
    }

    return (
        <span className='flex items-center gap-2'>
            {
                isLiked ?
                    <HeartFilledIcon className="w-4 h-4 cursor-pointer" onClick={() => likeBlog(data.id)} /> :
                    <Heart className="w-4 h-4 cursor-pointer" onClick={() => likeBlog(data.id)} />
            } {likes}
        </span>
    )
}


export default BlogLike
