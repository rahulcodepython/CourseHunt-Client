"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SendHorizonal } from "lucide-react"
import { InitialRegisterValuesType } from "@/types"
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation"
import useMutation from "@/hooks/useMutation"
import React from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { ReloadIcon } from "@radix-ui/react-icons"

const RegisterPage = () => {
    const [email, setEmail] = React.useState<string>("");

    const initialValues: InitialRegisterValuesType = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmpassword: '',
    }

    const { register, handleSubmit, formState: { errors } } = useForm<InitialRegisterValuesType>({
        defaultValues: initialValues,
    });

    const router = useRouter();

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const onSubmit = async (data: InitialRegisterValuesType) => {
        setEmail(data.email);
        await mutate(async () => registerUser(data));
    };

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    toast.success(mutationData.success);
                    localStorage.setItem('resend_otp_email_login', email);
                    router.push('/auth/verify/otp/register');
                }
            }
        }
        handler();
    }, [mutationState])

    return <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="first_name" className="uppercase text-gray-600 text-xs">
                    First Name
                </Label>
                <Input
                    type="text"
                    {...register('first_name', { required: 'First name is required' })}
                    placeholder="Enter your first name"
                    id="first_name"
                    className="w-full"
                    autoFocus
                    autoComplete="first_name"
                />
                {errors.first_name && <span className="text-red-500">{errors.first_name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="last_name" className="uppercase text-gray-600 text-xs">
                    Last Name
                </Label>
                <Input
                    type="text"
                    {...register('last_name', { required: 'Last name is required' })}
                    placeholder="Enter your last name"
                    id="last_name"
                    className="w-full"
                    autoComplete="last_name"
                />
                {errors.last_name && <span className="text-red-500">{errors.last_name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="uppercase text-gray-600 text-xs">
                    Email
                </Label>
                <Input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    placeholder="Enter your email"
                    id="email"
                    className="w-full"
                    autoComplete="email"
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="uppercase text-gray-600 text-xs">
                    Password
                </Label>
                <Input
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    placeholder="Enter your password"
                    id="password"
                    className="w-full"
                    autoComplete="password"
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="confirmpassword" className="uppercase text-gray-600 text-xs">
                    Confirm Password
                </Label>
                <Input
                    type="password"
                    {...register('confirmpassword', { required: 'Confirm password is required' })}
                    placeholder="Enter your password again"
                    id="confirmpassword"
                    className="w-full"
                    autoComplete="password"
                />
                {errors.confirmpassword && <span className="text-red-500">{errors.confirmpassword.message}</span>}
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
                <span>Register</span>
            </Button>
        }
    </form>
}

const registerUser = async (data: InitialRegisterValuesType) => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/me/`,
        method: 'POST',
        data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
        }
    };

    return await axios.request(options);
}

export default RegisterPage