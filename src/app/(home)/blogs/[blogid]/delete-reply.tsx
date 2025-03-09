import { useAuthStore } from '@/context/AuthStore';
import { useCommentStore } from '@/context/CommentStore';
import useMutation from '@/hooks/useMutation';
import { clientUrlGenerator } from '@/utils';
import { Trash } from 'lucide-react'
import React from 'react'

const DeleteReply = ({
    id,
    parent,
}: {
    id: string,
    parent: string,
}) => {
    const accessToken = useAuthStore((state) => state.accessToken)
    const deleteReply = useCommentStore((state) => state.deleteReply)

    const { mutate, onSuccess, onError } = useMutation();

    onSuccess((data) => {
        deleteReply(parent, id);
    })

    const options = {
        url: clientUrlGenerator(`/blogs/edit-comment/${id}/`),
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE",
    }

    const handleDelete = async () => {
        await mutate(options)
    }
    return (
        <Trash className="w-4 h-4 cursor-pointer" onClick={() => handleDelete()} />
    )
}

export default DeleteReply
