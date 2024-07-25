"use client"
import React from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
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
import { FetchUserData } from "@/utils";
import { Actions, useAuthStore } from '@/context/AuthStore';
import { Chrome, SendHorizonal } from 'lucide-react';

interface InitialValuesType {
    email: string
    password: string
}

const LoginPage: React.FC = () => {
    const [loading, setLoading] = React.useState<boolean>(false);

    const updateUser = useAuthStore((state) => state.UpdateUser)
    const loggedInUser = useAuthStore((state) => state.LoggedInUser)
    const router = useRouter();

    const initialValues: InitialValuesType = {
        email: '',
        password: ''
    }

    return <main className="flex items-center justify-center w-screen h-screen">
        <Card className="max-w-xl w-full">
            <CardHeader>
                <CardDescription>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Formik
                    initialValues={initialValues} onSubmit={async (values, actions) => {
                        setLoading(true)
                        await login(values, loggedInUser, updateUser, setLoading, router)
                        actions.resetForm();
                    }}>
                    {({ values, handleChange, handleSubmit }) => (
                        <Form className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="email" className="uppercase text-gray-600 text-xs">
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        id="email"
                                        className="w-full"
                                        autoFocus
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="password" className="uppercase text-gray-600 text-xs">
                                        Password
                                    </Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        id="password"
                                        className="w-full"
                                        autoFocus
                                        autoComplete="password"
                                        required
                                    />
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500 hover:underline cursor-pointer">
                                        Forgot Password?
                                    </span>
                                </div>
                            </div>
                            {
                                loading ? <Button disabled className="gap-2">
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button> :
                                    <Button type="submit" onClick={() => handleSubmit()} className="gap-2">
                                        <SendHorizonal className="h-4 w-4" />
                                        <span>Log In</span>
                                    </Button>
                            }
                        </Form>
                    )}
                </Formik>
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

const login = async (
    values: InitialValuesType,
    loggedInUser: Actions['LoggedInUser'],
    updateUser: Actions['UpdateUser'],
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    router: any,
) => {
    try {
        const response = await axios.post(`${process.env.BASE_API_URL}/auth/users/jwt/create/`, values);
        console.log(response)
        await loggedInUser(response.data.access, response.data.refresh);
        await FetchUserData(response.data.access, updateUser)
        router.push('/');
        toast.success('You are logged in.');
    } catch (error: any) {
        toast.error(error?.response?.data?.error ?? 'Something went wrong');
    } finally {
        setLoading(false);
    }
};

export default LoginPage;