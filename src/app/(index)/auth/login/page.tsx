"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Link } from 'next-view-transitions';
import { GitHubLogoIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useAuthStore } from '@/context/AuthStore';
import { Chrome, SendHorizonal } from 'lucide-react';
import { useMutation } from '@/hook';
import { toast } from 'react-toastify';
import { Encrypt } from '@/utils';
import { InitialLoginValuesType } from '@/types';
import { useForm, Controller } from 'react-hook-form';

const LoginPage: React.FC = () => {
    const loggedInUser = useAuthStore((state) => state.LoggedInUser)
    const router = useRouter();

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const { control, handleSubmit, reset } = useForm<InitialLoginValuesType>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: InitialLoginValuesType) => {
        try {
            await mutate({
                url: `${process.env.BASE_API_URL}/auth/users/jwt/create/`,
                method: 'POST',
                data: data
            });
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done' && mutationData) {
                toast.success(mutationData.message);
                loggedInUser(mutationData.access, mutationData.refresh, mutationData.user);
                sessionStorage.setItem('access', Encrypt(mutationData.access));
                localStorage.setItem('refresh', Encrypt(mutationData.refresh));
                localStorage.setItem('user', JSON.stringify(mutationData.user));
                router.push('/');
            } else if (mutationIsError) {
                toast.error(mutationError);
            }
        }
        handler();
    }, [mutationState])

    return <main className="flex items-center justify-center w-screen h-screen">
        <Card className="max-w-xl w-full">
            <CardHeader>
                <CardDescription>
                    <span className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password" className="uppercase text-gray-600 text-xs">
                                Password
                            </Label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="password"
                                        {...field}
                                        placeholder="Enter your password"
                                        id="password"
                                        className="w-full"
                                        autoFocus
                                        autoComplete="password"
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
            </CardContent>
            <CardFooter className="flex flex-col w-full gap-4">
                <div className="grid grid-cols-3 items-center text-gray-500 w-full">
                    <hr className="border-gray-500" />
                    <p className="text-center text-sm">OR</p>
                    <hr className="border-gray-500" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Button variant="outline" className="w-full">
                        <GitHubLogoIcon className="mr-2 h-4 w-4" />
                        Sign up with GitHub
                    </Button>
                    <Button variant="outline" className="w-full">
                        <Chrome className="mr-2 h-4 w-4" />
                        Sign up with Google
                    </Button>
                </div>
                <div className="text-sm flex justify-between items-center w-full">
                    <p>If you {`don't`} have an account...</p>
                    <Link href="/auth/register">
                        <span className='underline hover:cursor-pointer'>Register</span>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    </main>
};


export default LoginPage;