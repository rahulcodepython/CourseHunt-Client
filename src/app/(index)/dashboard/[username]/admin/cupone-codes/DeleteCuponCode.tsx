"use client"
import { Button } from '@/components/ui/button'
import useMutation from '@/hooks/useMutation'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'

const DeleteCuponeCode = ({ access_token, id, removeCuponeCode }: {
    access_token: string | undefined,
    id: string,
    removeCuponeCode: (id: string) => void
}) => {
    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    removeCuponeCode(id);
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
        </Button> : <Button onClick={async () => await mutate(() => deleteCouponCode(access_token, id))}>Delete</Button>
    )
}


const deleteCouponCode = async (access_token: string | undefined, id: string) => {
    const options = {
        url: `${process.env.BASE_API_URL}/transactions/edit-coupon-code/${id}/`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        method: "DELETE",
    }
    return await axios.request(options)
}

export default DeleteCuponeCode
