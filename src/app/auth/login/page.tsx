"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SendHorizonal } from 'lucide-react';
import { SignInFormCredentialsType, SignInFormType } from '@/types';
import { signInAction } from '@/app/action';
import { useForm } from 'react-hook-form';
import LoadingButton from '@/components/loading-button';
import axios from 'axios';
import { clientUrlGenerator, serverUrlGenerator } from '@/utils';

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

        try {
            const result = await axios.post(clientUrlGenerator('/auth/users/login/email/'), data, {
                headers: { "Content-Type": "application/json" }
            });
            localStorage.setItem('resend_otp_email_login', data.email);
            router.push('/auth/verify/otp/login');
        } catch {
            reset()
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

    const { register, handleSubmit, reset } = useForm<SignInFormCredentialsType>()

    const onSubmit = async (data: SignInFormCredentialsType) => {
        setLoading(true)
        const result = await signInAction(data)
        if (result) {
            router.push('/dashboard')
        } else {
            reset()
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