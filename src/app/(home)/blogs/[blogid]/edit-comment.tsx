"use client"
import LoadingButton from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/context/AuthStore'
import { useCommentStore } from '@/context/CommentStore'
import useMutation from '@/hooks/useMutation'
import { DetailBlogsCommentType } from '@/types'
import { clientUrlGenerator } from '@/utils'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { Pen, SendHorizonal } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify'

const EditComment = ({
    data,
}: {
    data: DetailBlogsCommentType
}) => {
    const [open, setOpen] = React.useState(false)

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const accessToken = useAuthStore((state) => state.accessToken)
    const editComment = useCommentStore((state) => state.editComment)

    const { mutate, mutationIsLoading, onSuccess, onError } = useMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const content = formData.get('comment') as string

        const options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            url: clientUrlGenerator(`/blogs/edit-comment/${data.id}/`),
            data: {
                content
            }
        }

        mutate(options)
    }

    onSuccess((data) => {
        editComment(data.id, data.content)
        setOpen(false)
    })

    onError((error) => {
        toast.error(error)
    })

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger>
                <Pen className="w-4 h-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Edit comment
                </DialogTitle>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <Textarea id="comment" rows={6}
                            defaultValue={data.content}
                            name='comment'
                            placeholder="Write a comment..." required></Textarea>
                    </div>
                    <LoadingButton loading={mutationIsLoading}>
                        <Button type="submit" className="gap-2" disabled={!isAuthenticated}>
                            <SendHorizonal className="h-4 w-4" />
                            <span>
                                Edit Comment
                            </span>
                        </Button>
                    </LoadingButton>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditComment
