"use client"
import LoadingButton from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/context/AuthStore'
import { useCommentStore } from '@/context/CommentStore'
import useMutation from '@/hooks/useMutation'
import { clientUrlGenerator } from '@/utils'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { Pen, Reply, SendHorizonal } from 'lucide-react'
import React from 'react'

const CreateReply = ({
    blogid,
    parent
}: {
    blogid: string | undefined,
    parent: string
}) => {
    const [open, setOpen] = React.useState(false)

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const accessToken = useAuthStore((state) => state.accessToken)
    const createReply = useCommentStore((state) => state.createReply)

    const { mutate, mutationIsLoading, onSuccess, onError } = useMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const content = formData.get('comment') as string

        const options = {
            method: 'POST',
            url: clientUrlGenerator('/blogs/create-comment/'),
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                content: content,
                blog: blogid,
                parent: parent
            }
        };

        e.currentTarget.reset()
        mutate(options)

    }

    onSuccess((data) => {
        createReply(parent, data)
        setOpen(false)
    })

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger>
                <Reply className="w-4 h-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Create reply
                </DialogTitle>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <Textarea id="comment" rows={6} name='comment'
                            placeholder="Write a comment..." required></Textarea>
                    </div>
                    <LoadingButton loading={mutationIsLoading}>
                        <Button type="submit" className="gap-2" disabled={!isAuthenticated}>
                            <SendHorizonal className="h-4 w-4" />
                            <span>
                                Create Reply
                            </span>
                        </Button>
                    </LoadingButton>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateReply
