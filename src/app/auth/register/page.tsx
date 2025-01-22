"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, Eye, EyeClosed, SendHorizonal, X } from "lucide-react"
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation"
import React from "react"
import { SignUpFormType } from "@/types"
import { clientUrlGenerator } from "@/utils"
import LoadingButton from "@/components/loading-button"
import { toast } from "react-toastify"
import axios from "axios"

const RegisterPage = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<SignUpFormType>()

    const [emailIsValid, setEmailIsValid] = React.useState<boolean>(true);
    const [togglePassword, setTogglePassword] = React.useState<boolean>(true);
    const [toggleConfirmPassword, setToggleConfirmPassword] = React.useState<boolean>(true);


    const onSubmit = async (data: SignUpFormType) => {
        if (data.password !== data.confirmpassword) {
            toast.error('Password and confirm password does not match');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(clientUrlGenerator('/auth/users/me/'), data)
            localStorage.setItem('resend_otp_email_register', data.email);
            router.push('/auth/verify/otp/register');
            toast.success(response.data.success);
        } catch (error: any) {
            reset();
            toast.error(error.response.data.error);
        }
        setLoading(false);
    }

    const checkEmailAvailability = async (email: string) => {
        try {
            await axios.post(clientUrlGenerator('/auth/users/check-email/'), { email });
            setEmailIsValid(true);
        } catch (error) {
            setEmailIsValid(false);
        }
    }

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
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="uppercase text-gray-600 text-xs">
                    Email
                </Label>
                <div className="flex items-center gap-2">
                    <Input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        placeholder="Enter your email"
                        id="email"
                        className="w-full"
                        autoComplete="email"
                        onBlur={(e) => checkEmailAvailability(e.target.value)}
                    />
                    {
                        emailIsValid ?
                            <Check className="h-4 w-4 text-green-500" />
                            : <X className="h-4 w-4 text-red-500" />
                    }
                </div>
                {
                    !emailIsValid && <span className="text-red-500 text-xs">Email is already taken</span>
                }
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="uppercase text-gray-600 text-xs">
                    Password
                </Label>
                <div className="flex items-center gap-2">
                    <Input
                        type={togglePassword ? "password" : "text"}
                        {...register('password', { required: 'Password is required' })}
                        placeholder="Enter your password"
                        id="password"
                        className="w-full"
                        autoComplete="password"
                    />
                    {
                        togglePassword ?
                            <EyeClosed className="h-4 w-4 cursor-pointer" onClick={() => setTogglePassword(pre => !pre)} />
                            : <Eye className="h-4 w-4 cursor-pointer" onClick={() => setTogglePassword(pre => !pre)} />
                    }
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="confirmpassword" className="uppercase text-gray-600 text-xs">
                    Confirm Password
                </Label>
                <div className="flex items-center gap-2">
                    <Input
                        type={toggleConfirmPassword ? "password" : "text"}
                        {...register('confirmpassword', { required: 'Confirm password is required' })}
                        placeholder="Enter your password again"
                        id="confirmpassword"
                        className="w-full"
                        autoComplete="password"
                    />
                    {
                        toggleConfirmPassword ?
                            <EyeClosed className="h-4 w-4 cursor-pointer" onClick={() => setToggleConfirmPassword(pre => !pre)} />
                            : <Eye className="h-4 w-4 cursor-pointer" onClick={() => setToggleConfirmPassword(pre => !pre)} />
                    }
                </div>
            </div>
        </div>
        <LoadingButton loading={loading}>
            <Button type="submit" className="gap-2">
                <SendHorizonal className="h-4 w-4" />
                Register
            </Button>
        </LoadingButton>
    </form>
}

export default RegisterPage