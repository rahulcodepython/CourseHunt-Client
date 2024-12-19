import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore'
import useMutation from '@/hooks/useMutation'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { Link } from 'next-view-transitions'
import React from 'react'
import { toast } from 'react-toastify'

const BlogsAction = ({ id, deleteBlogItem }: {
    id: string,
    deleteBlogItem: (id: string) => void
}) => {
    const user = useAuthStore(state => state.user)
    const accessToken = useAuthStore(state => state.accessToken)

    const { mutationIsLoading, mutate, mutationData, mutationIsError, mutationState, mutationError } = useMutation();

    React.useEffect(() => {
        if (mutationState === "done") {
            if (mutationIsError) {
                toast.error(mutationError);
            }
            else {
                deleteBlogItem(id);
                toast.success(mutationData.success);
            }
        }
    }, [mutationData]);

    return (
        <div className='flex gap-4'>
            <Link href={`/dashboard/${user?.username}/admin/blogs/edit-blog/${id}`}>
                <Button>Edit</Button>
            </Link>
            {
                mutationIsLoading ? <Button className='gap-2'>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                </Button> :
                    <Button variant={'destructive'} onClick={async () => await mutate(() => deleteBlog(id, accessToken))}>Delete</Button>
            }
        </div>
    )
}

const deleteBlog = async (id: string, accessToken: string | undefined) => {
    return await axios.delete(`${process.env.BASE_API_URL}/blogs/update/${id}/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
}

export default BlogsAction
