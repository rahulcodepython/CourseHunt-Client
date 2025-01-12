"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useMutation from '@/hooks/useMutation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/context/AuthStore';
import { ReloadIcon } from '@radix-ui/react-icons';
import { SendHorizonal } from 'lucide-react';
import axios from 'axios';
import Markdown from 'react-markdown';
import FileUpload from '@/components/FileUpload';
import { handleUploadFile } from '@/utils/firebase';

const blogSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
});

type BlogFormValues = z.infer<typeof blogSchema> & { image: string };

const BlogForm = ({
    edit, data, id
}: {
    edit?: boolean,
    data?: {
        id: string
        title: string
        content: string
        image: string
    },
    id?: string
}) => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: edit ? data : undefined
    });

    const [file, setFile] = React.useState<File | null>(null);

    const accessToken = useAuthStore(state => state.accessToken);

    const router = useRouter();

    const { mutationIsLoading, mutate, mutationData, mutationIsError, mutationState, mutationError } = useMutation();

    const onSubmit = async (data: BlogFormValues) => {
        if (edit && id) {
            await mutate(() => updateBlog(data, accessToken, id, file));
        }
        else {
            await mutate(() => createBlog(data, accessToken, file));
        }
    };

    React.useEffect(() => {
        if (mutationState === "done") {
            if (mutationIsError) {
                toast.error(mutationError);
            }
            else {
                reset();
                router.push(`/dashboard/admin/blogs`);
                toast.success(mutationData.success);
            }
        }
    }, [mutationData]);

    const content = watch('content');
    const image = watch('image');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div>
                <label htmlFor="title">Title</label>
                <Input id="title" {...register('title')} />
                {errors.title && <span>{errors.title.message}</span>}
            </div>

            <FileUpload setValue={setFile} allowedFileTypes={['jpeg', 'jpg', 'png']} url={image} />

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="content">Content</label>
                    <Textarea id="content" {...register('content')} className='w-full h-full resize-none whitespace-pre-wrap break-words p-4 overflow-y-scroll' />
                    {errors.content && <span>{errors.content.message}</span>}
                </div>
                <div>
                    <div className="w-full h-full p-4 prose prose-sm overflow-hidden break-words">
                        <Markdown>
                            {content}
                        </Markdown>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                {mutationIsLoading ?
                    <Button disabled className="gap-2" type="button">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button> : <Button type="submit" className="gap-2">
                        <SendHorizonal className="h-4 w-4" />
                        <span>Submit</span>
                    </Button>
                }
            </div>
        </form>
    );
};

const createBlog = async (data: BlogFormValues, access_token: string | undefined, file: File | null) => {
    if (file) {
        const image = await handleUploadFile(file);
        if (!image) {
            throw new Error('Image upload failed');
        }
        data.image = image;
    }
    const response = await axios.post(`${process.env.BASE_API_URL}/blogs/create/`, data, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return response;
};

const updateBlog = async (data: BlogFormValues, access_token: string | undefined, id: string, file: File | null) => {
    if (file) {
        const image = await handleUploadFile(file);
        if (!image) {
            throw new Error('Image upload failed');
        }
        data.image = image;
    }
    const response = await axios.patch(`${process.env.BASE_API_URL}/blogs/update/${id}/`, data, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });
    return response;
};

export default BlogForm;