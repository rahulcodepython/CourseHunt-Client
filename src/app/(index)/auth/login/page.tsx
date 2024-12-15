"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ReloadIcon } from '@radix-ui/react-icons';
import { SendHorizonal } from 'lucide-react';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import useMutation from '@/hooks/useMutation';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const router = useRouter();

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const { control, handleSubmit, reset } = useForm<{ email: string }>({
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = async (data: { email: string }) => {
        await mutate(async () => initLoginUser(data));
    };

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    toast.success(mutationData.success);
                    reset();
                    router.push('/auth/verify/otp/login');
                }
            }
        }
        handler();
    }, [mutationState])

    return <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="uppercase text-gray-600 text-xs">
                    Email
                </Label>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="email"
                            {...field}
                            placeholder="Enter your email"
                            id="email"
                            className="w-full"
                            autoFocus
                            autoComplete="email"
                            required
                        />
                    )}
                />
            </div>
            <div className="text-right">
                <span className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500 hover:underline cursor-pointer">
                    Forgot Password?
                </span>
            </div>
        </div>
        {
            mutationIsLoading ? <Button disabled className="gap-2">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
            </Button> : <Button type="submit" className="gap-2">
                <SendHorizonal className="h-4 w-4" />
                <span>Log In</span>
            </Button>
        }
    </form>
};

const initLoginUser = async (data: { email: string }) => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/jwt/init/`,
        method: 'POST',
        data: data
    };

    return await axios.request(options);
}

export default LoginPage;