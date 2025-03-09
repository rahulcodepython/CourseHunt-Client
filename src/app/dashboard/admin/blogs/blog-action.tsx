"use client"
import LoadingButton from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore'
import useMutation from '@/hooks/useMutation'
import { clientUrlGenerator } from '@/utils'
import Link from 'next/link'
import React from 'react'

const BlogAction = ({ id, deleteBlogItem }: {
    id: string,
    deleteBlogItem: (id: string) => void
}) => {
    const accessToken = useAuthStore(state => state.accessToken)

    const { mutationIsLoading, mutate, onSuccess, } = useMutation();

    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        methods: 'DELETE',
        url: clientUrlGenerator(`/blogs/update/${id}/`)
    };

    onSuccess((data) => {
        deleteBlogItem(id);
    });

    return (
        <div className='flex gap-4'>
            <Link href={`/dashboard/admin/blogs/edit-blog/${id}`}>
                <Button>Edit</Button>
            </Link>
            <LoadingButton loading={mutationIsLoading} loadingText='Deleting...'>
                <Button variant={'destructive'} onClick={async () => await mutate(options)}>Delete</Button>
            </LoadingButton>
        </div>
    )
}

export default BlogAction
