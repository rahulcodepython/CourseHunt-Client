import { useAuthStore } from '@/context/AuthStore';
import { useCommentStore } from '@/context/CommentStore';
import useMutation from '@/hooks/useMutation';
import { clientUrlGenerator } from '@/utils';
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify';

const DeleteComment = ({ id }: {
    id: string,
}) => {
    const { mutate, onSuccess, onError } = useMutation();

    const accessToken = useAuthStore((state) => state.accessToken);
    const deleteComment = useCommentStore((state) => state.deleteComment);

    onSuccess((data) => {
        deleteComment(id);
        toast.success(data.success);
    })

    onError((error) => {
        toast.error(error);
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

export default DeleteComment
