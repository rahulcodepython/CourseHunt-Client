"use client"
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore';
import useMutation from '@/hooks/useMutation';
import { clientUrlGenerator } from '@/utils';
import React from 'react'

const DeleteFeedback = ({ feedbackId, removeFeedback }: {
    feedbackId: string,
    removeFeedback: (feedbackId: string) => void
}) => {
    const accessToken = useAuthStore(state => state.accessToken);

    const { mutate, mutationIsLoading, onSuccess, } = useMutation();

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
