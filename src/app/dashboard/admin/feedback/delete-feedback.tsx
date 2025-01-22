"use client"
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore';
import useMutation from '@/hooks/useMutation';
import { clientUrlGenerator } from '@/utils';
import React from 'react'
import { toast } from 'react-toastify';

const DeleteFeedback = ({ feedbackId, removeFeedback }: {
    feedbackId: string,
    removeFeedback: (feedbackId: string) => void
}) => {
    const accessToken = useAuthStore(state => state.accessToken);

    const { mutate, mutationIsLoading, onSuccess, onError } = useMutation();

    const options = {
        url: clientUrlGenerator(`/feedback/delete/${feedbackId}/`),
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE",
    }

    const handleDeleteFeedback = async () => {
        await mutate(options);
    }

    onSuccess((data) => {
        removeFeedback(feedbackId);
        toast.success(data.success);
    })

    onError((error) => {
        toast.error(error);
    })


    return (
        <LoadingButton loading={mutationIsLoading} loadingText='Deleting...'>
            <Button variant="destructive" onClick={() => handleDeleteFeedback()}>
                Delete
            </Button>
        </LoadingButton>
    )
}

export default DeleteFeedback
