"use client"
import LoadingButton from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/context/AuthStore'
import { useCommentStore } from '@/context/CommentStore'
import useMutation from '@/hooks/useMutation'
import { clientUrlGenerator } from '@/utils'
import { SendHorizonal } from 'lucide-react'
import React from 'react'

const CreateCommentForm = ({ blogid }: {
    blogid: string | undefined,
}) => {
    const { mutate, mutationIsLoading, onSuccess, } = useMutation();

    const accessToken = useAuthStore((state) => state.accessToken)
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const createComment = useCommentStore((state) => state.createComment)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const comment = formData.get('comment') as string

        const options = {
            method: 'POST',
            url: clientUrlGenerator('/blogs/create-comment/'),
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                content: comment,
                blog: blogid
            }
        };

        e.currentTarget.reset()
        mutate(options)
    }

    onSuccess((data: any) => {
        createComment(data)
    })

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <Label htmlFor="comment">Your comment</Label>
                <Textarea id="comment" name='comment' rows={6} placeholder="Write a comment..." required></Textarea>
            </div>
            <LoadingButton loading={mutationIsLoading} loadingText="Please wait">
                <Button type="submit" className="gap-2" disabled={!isAuthenticated}>
                    <SendHorizonal className="h-4 w-4" />
                    <span>
                        Post Comment
                    </span>
                </Button>
            </LoadingButton>
        </form>
    )
}

export default CreateCommentForm
