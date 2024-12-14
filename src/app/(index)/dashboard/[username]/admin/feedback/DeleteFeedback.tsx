"use client"
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore';
import useMutation from '@/hooks/useMutation';
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';

const DeleteFeedback = ({ feedbackId, removeFeedback }: {
    feedbackId: string,
    removeFeedback: (feedbackId: string) => void
}) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const accessToken = useAuthStore(state => state.accessToken);

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const handleDeleteFeedback = async () => {
        isAuthenticated && await mutate(() => deleteFeedback(feedbackId, accessToken));
    }

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    removeFeedback(feedbackId);
                    toast.success(mutationData.success);
                }
            }
        }
        handler();
    }, [mutationState])
    return (

        mutationIsLoading ? <Button disabled className="gap-2">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </Button> : <Button variant="destructive" onClick={() => handleDeleteFeedback()}>Delete</Button>
    )
}

const deleteFeedback = async (feedbackId: string, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/feedback/delete/${feedbackId}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "DELETE",
    }
    return await axios.request(options)
}

export default DeleteFeedback
