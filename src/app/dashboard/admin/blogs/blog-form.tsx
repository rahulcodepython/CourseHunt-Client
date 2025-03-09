"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useMutation from '@/hooks/useMutation';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/context/AuthStore';
import { SendHorizonal } from 'lucide-react';
import Markdown from 'react-markdown';
import { handleUploadFile } from '@/utils/firebase';
import LoadingButton from '@/components/loading-button';
import FileUpload from '@/components/file-upload';
import { clientUrlGenerator } from '@/utils';
import { Label } from '@/components/ui/label';

const blogSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    image: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

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
    const [fileChange, setFileChange] = React.useState<boolean>(false);

    const accessToken = useAuthStore(state => state.accessToken);

    const router = useRouter();

    const { mutationIsLoading, mutate, onSuccess, } = useMutation();

    const onSubmit = async (data: BlogFormValues) => {
        try {
            if (edit && !fileChange) {
                return;
            }
            if (file) {
                const image = await handleUploadFile(file);
                if (!image) {
                    throw new Error('Image upload failed');
                }
                data.image = image;
            }
        } catch {
        }

        if (edit && id) {
            const options = {
                url: clientUrlGenerator(`/blogs/update/${id}/`),
                method: 'PATCH',
                data: data,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            };
            await mutate(options);
        }
        else {
            const options = {
                url: clientUrlGenerator(`/blogs/create/`),
                method: 'POST',
                data: data,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            };
            await mutate(options);
        }
    };

    onSuccess((data) => {
        reset();
        router.push(`/dashboard/admin/blogs`);
    });

    const content = watch('content');
    const image = watch('image');

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title')} />
                {errors.title && <span>{errors.title.message}</span>}
            </div>

            <div>
                <Label htmlFor="image">Image</Label>
                <FileUpload setValue={setFile} allowedFileTypes={['jpeg', 'jpg', 'png']} url={image} setFileChange={setFileChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="content">Content</Label>
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
                <LoadingButton loading={mutationIsLoading} loadingText='Submitting...'>
                    <Button type="submit" className="gap-2">
                        <SendHorizonal className="h-4 w-4" />
                        <span>Submit</span>
                    </Button>
                </LoadingButton>
            </div>
        </form>
    );
};

export default BlogForm;