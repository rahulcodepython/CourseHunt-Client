"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/context/AuthStore'
import useMutation from '@/hooks/useMutation'
import { DetailBlogsCommentType, DetailBlogsType, UserType } from '@/types'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { Pen, Reply, SendHorizonal, Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify'

const Comments = ({ data, isAuth, access, user }: {
    data: DetailBlogsType,
    isAuth: boolean,
    access: string | undefined,
    user: UserType | null
}) => {
    const [comments, setComments] = React.useState<DetailBlogsCommentType[]>(data.comment)
    const [totalComments, setTotalComments] = React.useState<number>(data.comments)
    const [comment, setComment] = React.useState<string>('')

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        isAuth && await mutate(async () => createComment({
            content: comment,
            blog: data.id
        }, access))
    }

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    setComments([mutationData, ...comments])
                    setTotalComments(totalComments + 1)
                    setComment('')
                }
            }
        }
        handler();
    }, [mutationState])

    return (
        <section className="not-format">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">
                    Comments ({totalComments})
                </h2>
            </div>
            <form onSubmit={e => onSubmit(e)} className="mb-6 flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <Label htmlFor="comment">Your comment</Label>
                    <Textarea id="comment" rows={6}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..." required></Textarea>
                </div>
                {
                    mutationIsLoading ? <Button disabled className="gap-2">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button> : <Button type="submit" className="gap-2" disabled={!isAuth}>
                        <SendHorizonal className="h-4 w-4" />
                        <span>
                            Post Comment
                        </span>
                    </Button>
                }
            </form>
            <div className='flex flex-col gap-6 pt-6'>
                {
                    comments.map((item, index) => {
                        return <div className="flex flex-col gap-8 pt-6" key={index}>
                            <article className="">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-4">
                                        <p className="inline-flex items-center font-semibold text-sm">
                                            <img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                alt="Michael Gough" />
                                            {item.user}
                                        </p>
                                        <p className="text-sm">
                                            {item.created_at}
                                        </p>
                                        {
                                            user?.username === item.user && isAuth && <DeleteCommentComponent id={item.id} comments={comments} setComments={setComments} totalComments={totalComments} setTotalComments={setTotalComments} />
                                        }
                                        {
                                            user?.username === item.user && isAuth && <EditCommentComponent data={item} setComments={setComments} />
                                        }
                                        {
                                            isAuth && <ReplyCommentComponent data={data} setComments={setComments} totalComments={totalComments} setTotalComments={setTotalComments} parent={item.id} />
                                        }
                                    </div>
                                </footer>
                                <p>
                                    {item.content}
                                </p>
                            </article>
                            {
                                item.children.length > 0 && item.children.map((child, index) => {
                                    return <article className="ml-12" key={index}>
                                        <footer className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-4">
                                                <p className="inline-flex items-center font-semibold text-sm">
                                                    <img
                                                        className="mr-2 w-6 h-6 rounded-full"
                                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                        alt="Jese Leos" />
                                                    {child.user}
                                                </p>
                                                <p className="text-sm">
                                                    {child.created_at}
                                                </p>
                                                {
                                                    user?.username === child.user && isAuth && <DeleteCommentComponent id={child.id} comments={comments} setComments={setComments} totalComments={totalComments} setTotalComments={setTotalComments} parent={item.id} />
                                                }
                                                {
                                                    user?.username === child.user && isAuth && <EditCommentComponent data={child} setComments={setComments} parent={item.id} />
                                                }
                                                {
                                                    isAuth && <ReplyCommentComponent data={data} setComments={setComments} totalComments={totalComments} setTotalComments={setTotalComments} parent={item.id} />
                                                }
                                            </div>
                                        </footer>
                                        <p>
                                            {child.content}
                                        </p>
                                    </article>
                                })
                            }
                        </div>
                    })
                }
            </div>
        </section>
    )
}

const ReplyCommentComponent = (
    { data, setComments, totalComments, setTotalComments, parent }: {
        data: DetailBlogsType,
        setComments: React.Dispatch<React.SetStateAction<DetailBlogsCommentType[]>>,
        totalComments: number,
        setTotalComments: React.Dispatch<React.SetStateAction<number>>,
        parent: string
    }
) => {
    const [open, setOpen] = React.useState(false)
    const [comment, setComment] = React.useState<string>('')

    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const accessToken = useAuthStore(state => state.accessToken)

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        isAuthenticated && await mutate(async () => createComment({
            content: comment,
            blog: data.id,
            parent: parent
        }, accessToken))
    }

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    setComments(pre => {
                        return pre.map(item => {
                            if (item.id === parent) {
                                return {
                                    ...item,
                                    children: [mutationData, ...item.children]
                                }
                            }
                            return item
                        })
                    })
                    setTotalComments(totalComments + 1)
                    setComment('')
                    setOpen(false)
                }
            }
        }
        handler();
    }, [mutationState])

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger>
                <Reply className="w-4 h-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Reply to comment
                </DialogTitle>
                <form onSubmit={e => onSubmit(e)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <Textarea id="comment" rows={6}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment..." required></Textarea>
                    </div>
                    {
                        mutationIsLoading ? <Button disabled className="gap-2">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button type="submit" className="gap-2" disabled={!isAuthenticated}>
                            <SendHorizonal className="h-4 w-4" />
                            <span>
                                Post Comment
                            </span>
                        </Button>
                    }
                </form>
            </DialogContent>
        </Dialog>
    )
}

const EditCommentComponent = (
    { data, setComments, parent = null }: {
        data: { id: string, content: string },
        setComments: React.Dispatch<React.SetStateAction<DetailBlogsCommentType[]>>,
        parent?: string | null
    }
) => {
    const [open, setOpen] = React.useState(false)
    const [comment, setComment] = React.useState<string>(data.content)

    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const accessToken = useAuthStore(state => state.accessToken)

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        isAuthenticated && await mutate(async () => editComment({
            content: comment
        }, accessToken, data.id))
    }

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    toast.success(mutationData.success)
                    setComments(pre => {
                        return pre.map(item => {
                            if (parent) {
                                if (item.id === parent) {
                                    return {
                                        ...item,
                                        children: item.children.map(child => {
                                            if (child.id === data.id) {
                                                return {
                                                    ...child,
                                                    content: comment
                                                }
                                            }
                                            return child
                                        })
                                    }
                                }
                            } else if (item.id === data.id) {
                                return {
                                    ...item,
                                    content: comment
                                }
                            }
                            return item
                        })
                    })
                    setComment('')
                    setOpen(false)
                }
            }
        }
        handler();
    }, [mutationState])

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger>
                <Pen className="w-4 h-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Edit comment
                </DialogTitle>
                <form onSubmit={e => onSubmit(e)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <Textarea id="comment" rows={6}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment..." required></Textarea>
                    </div>
                    {
                        mutationIsLoading ? <Button disabled className="gap-2">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button type="submit" className="gap-2" disabled={!isAuthenticated}>
                            <SendHorizonal className="h-4 w-4" />
                            <span>
                                Edit Comment
                            </span>
                        </Button>
                    }
                </form>
            </DialogContent>
        </Dialog>
    )
}

const DeleteCommentComponent = ({ id, comments, setComments, totalComments, setTotalComments, parent = null }: {
    id: string,
    comments: DetailBlogsCommentType[],
    setComments: React.Dispatch<React.SetStateAction<DetailBlogsCommentType[]>>,
    totalComments: number,
    setTotalComments: React.Dispatch<React.SetStateAction<number>>
    parent?: string | null
}) => {
    const accessToken = useAuthStore(state => state.accessToken)
    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    toast.success(mutationData.success)
                    setComments(pre => {
                        return pre.reduce((acc, item) => {
                            if (parent) {
                                if (item.id === parent) {
                                    acc.push({
                                        ...item,
                                        children: item.children.filter(child => child.id !== id)
                                    });
                                } else {
                                    acc.push(item);
                                }
                            } else if (item.id !== id) {
                                acc.push(item);
                            }
                            return acc;
                        }, [] as DetailBlogsCommentType[]);
                    })
                    setTotalComments(totalComments - 1)
                }
            }
        }
        handler();
    }, [mutationState])

    return (
        <Trash className="w-4 h-4 cursor-pointer" onClick={async () => !mutationIsLoading && await mutate(() => deleteComment(id, accessToken))} />
    )
}

const createComment = async (data: { content: string, blog: string, parent?: string }, accessToken: string | undefined) => {
    return await axios.post(`${process.env.BASE_API_URL}/blogs/create-comment/`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

const editComment = async (data: { content: string }, accessToken: string | undefined, id: string) => {
    return await axios.post(`${process.env.BASE_API_URL}/blogs/edit-comment/${id}/`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

const deleteComment = async (id: string, accessToken: string | undefined) => {
    return await axios.delete(`${process.env.BASE_API_URL}/blogs/edit-comment/${id}/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export default Comments
