"use client"
import LoadingButton from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import useMutation from '@/hooks/useMutation'
import { clientUrlGenerator } from '@/utils'
import React from 'react'

const DeleteCouponeCode = ({ access_token, id, removeCuponeCode }: {
    access_token: string | undefined,
    id: string,
    removeCuponeCode: (id: string) => void
}) => {
    const { mutate, mutationIsLoading, onSuccess, onError } = useMutation();

    onSuccess((data) => {
        removeCuponeCode(id);
    })

    const options = {
        url: clientUrlGenerator(`/transactions/edit-coupon-code/${id}/`),
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "DELETE",
    }

    return (
        <LoadingButton loading={mutationIsLoading} loadingText='Deleteing...'>
            <Button onClick={async () => await mutate(options)}>Delete</Button>
        </LoadingButton>
    )
}

export default DeleteCouponeCode
