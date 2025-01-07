"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SendHorizonal } from 'lucide-react';
import { SignInFormType } from '@/types';
import { initLoginUser, signInAction } from '@/app/action';
import { useForm } from 'react-hook-form';
import LoadingButton from '@/components/loading-button';
import { toast } from 'sonner';

const LoginPage: React.FC = () => {
    const OTP_VERIFICATION_LOGIN = process.env.OTP_VERIFICATION_LOGIN === 'true' ? true : false;

    if (OTP_VERIFICATION_LOGIN) {
        return <LoginWithEmail />
    } else {
        return <LoginWithCredentials />
    }
};

const LoginWithEmail = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<SignInFormType>()

    const onSubmit = async (data: SignInFormType) => {
        setLoading(true)
        const result = await initLoginUser(data)

        if (result) {
            if (result.status === 200) {
                localStorage.setItem('resend_otp_email_login', data.email);
                router.push('/auth/verify/otp/login');
                router.push('/')
                toast(result.data.success)
            } else {
                reset()
                toast(result.data.error)
            }
        }
        setLoading(false)
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="uppercase text-gray-600 text-xs">
                    Email
                </Label>
                <Input
                    type="email"
                    {...register('email')}
                    placeholder="Enter your email"
                    id="email"
                    className="w-full"
                    autoFocus
                    autoComplete="email"
                    required
                />
            </div>
        </div>
        <LoadingButton loading={loading}>
            <Button type="submit" className="gap-2">
                <SendHorizonal className="h-4 w-4" />
                Log In
            </Button>
        </LoadingButton>
    </form>
}

const LoginWithCredentials = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter()

    const { register, handleSubmit, reset } = useForm<SignInFormType>()

    const onSubmit = async (data: SignInFormType) => {
        setLoading(true)
        const result = await signInAction(data)

        if (result) {
            if (result.status === 200) {
                router.push('/')
                toast(result.data.success)
            } else {
                reset()
                toast(result.data.error)
            }
        }
        setLoading(false)
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="uppercase text-gray-600 text-xs">
                    Email
                </Label>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    className="w-full"
                    autoFocus
                    autoComplete="email"
                    required
                    {...register('email')}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="uppercase text-gray-600 text-xs">
                    Password
                </Label>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    id="password"
                    className="w-full"
                    autoFocus
                    autoComplete="password"
                    required
                    {...register('password')}
                />
            </div>
        </div>
        <LoadingButton loading={loading}>
            <Button type="submit" className="gap-2">
                <SendHorizonal className="h-4 w-4" />
                Log In
            </Button>
        </LoadingButton>
    </form>
}

export default LoginPage;