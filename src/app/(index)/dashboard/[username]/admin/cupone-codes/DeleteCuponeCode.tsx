"use client"
import { Button } from '@/components/ui/button'
import useMutation from '@/hooks/useMutation'
import { deleteCouponCode } from '@/server/action'
import React from 'react'
import { toast } from 'react-toastify'

const DeleteCuponeCode = ({ access_token, id }: {
    access_token: string | undefined,
    id: number
}) => {
    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationData.data);
                }
                else {
                    toast.success(mutationData.data);
                }
            }
        }
        handler();
    }, [mutationState])

    return (
        <Button onClick={async () => await mutate(() => deleteCouponCode(access_token, id))}>Delete</Button>
    )
}

export default DeleteCuponeCode
