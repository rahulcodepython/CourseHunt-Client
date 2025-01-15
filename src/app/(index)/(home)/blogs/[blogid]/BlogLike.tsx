"use client"
import { useAuthStore } from '@/context/AuthStore'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { Heart } from 'lucide-react'
import React from 'react'

const BlogLike = ({ data }: {
    data: {
        likes: number
        id: string
        liked: boolean
    }
}) => {
    const [likes, setLikes] = React.useState(data.likes)
    const [isLiked, setIsLiked] = React.useState(data.liked)
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const accessToken = useAuthStore(state => state.accessToken)

    const likeBlog = async (id: string) => {
        if (!isAuthenticated) return

        try {
            const response = await axios.post(`${process.env.BASE_API_URL}/blogs/like-blog/${id}/`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const data = await response.data
            if (data.liked) {
                setLikes(likes + 1)
                setIsLiked(true)
            } else {
                setLikes(likes - 1)
                setIsLiked(false)
            }
        } catch (error) {
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
