"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { useAuthStore } from '@/context/AuthStore'
import useMutation from '@/hooks/useMutation'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Eye, EyeClosed, SendHorizonal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'
import Countdown, { zeroPad } from 'react-countdown';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ResetPasswordPage = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const loggedInUser = useAuthStore((state) => state.LoggedInUser);
    const router = useRouter();

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const [oldPassword, setOldPassword] = React.useState<string>("")
    const [toggleOldPassword, setToggleOldPassword] = React.useState<boolean>(true)
    const [newPassword, setNewPassword] = React.useState<string>("")
    const [toggleNewPassword, setToggleNewPassword] = React.useState<boolean>(true)
    const [rewriteNewPassword, setRewriteNewPassword] = React.useState<string>("")
    const [toggleRewriteNewPassword, setToggleRewriteNewPassword] = React.useState<boolean>(true)
    const [value, setValue] = React.useState<string>("")

    const onSubmit = async () => {
        if (value.length < 8) {
            return;
        }

        if (newPassword !== rewriteNewPassword) {
            toast.error("New password and rewrite new password does not match");
            return;
        }

        const uid = value.slice(0, 4);
        const token = value.slice(4, 8);

        await mutate(async () => resetPassword({ uid, token, oldPassword, newPassword }, accessToken));
    };

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    setOldPassword("");
                    setNewPassword("");
                    setRewriteNewPassword("");
                    setValue("");
                    setToggleNewPassword(true);
                    setToggleOldPassword(true);
                    setToggleRewriteNewPassword(true);
                    toast.success(mutationData.success);
                }
            }
        }
        handler();
    }, [mutationState])

    return (
        <div className='flex flex-col gap-4 items-center justify-center h-screen'>
            <Card className='max-w-2xl w-full'>
                <CardHeader className='flex items-center justify-between w-full flex-row'>
                    <CardTitle>
                        Change Password
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4 items-center'>
                    <div className='w-full'>
                        <Label>Old Password</Label>
                        <div className='flex items-center gap-2'>
                            <Input
                                type={toggleOldPassword ? 'password' : 'text'}
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                                placeholder='Enter your old password' />
                            {
                                toggleOldPassword ?
                                    <EyeClosed onClick={() => setToggleOldPassword(pre => !pre)} className='h-4 w-4 cursor-pointer' /> :
                                    <Eye onClick={() => setToggleOldPassword(pre => !pre)} className='h-4 w-4 cursor-pointer' />
                            }
                        </div>
                    </div>
                    <div className='w-full'>
                        <Label>New Password</Label>
                        <div className='flex items-center gap-2'>
                            <Input
                                type={toggleNewPassword ? 'password' : 'text'}
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder='Enter your new password' />
                            {
                                toggleNewPassword ?
                                    <EyeClosed onClick={() => setToggleNewPassword(pre => !pre)} className='h-4 w-4 cursor-pointer' /> :
                                    <Eye onClick={() => setToggleNewPassword(pre => !pre)} className='h-4 w-4 cursor-pointer' />
                            }
                        </div>
                    </div>
                    <div className='w-full'>
                        <Label>Rewrite New Password</Label>
                        <div className='flex items-center gap-2'>
                            <Input
                                type={toggleRewriteNewPassword ? 'password' : 'text'}
                                value={rewriteNewPassword}
                                onChange={e => setRewriteNewPassword(e.target.value)}
                                placeholder='Enter your new password again' />
                            {
                                toggleRewriteNewPassword ?
                                    <EyeClosed onClick={() => setToggleRewriteNewPassword(pre => !pre)} className='h-4 w-4 cursor-pointer' /> :
                                    <Eye onClick={() => setToggleRewriteNewPassword(pre => !pre)} className='h-4 w-4 cursor-pointer' />
                            }
                        </div>
                    </div>
                    <div className='w-full'>
                        <Label>Verification Code</Label>
                    </div>
                    <InputOTP maxLength={8} value={value}
                        onChange={(value) => setValue(value)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                            <InputOTPSlot index={6} />
                            <InputOTPSlot index={7} />
                        </InputOTPGroup>
                    </InputOTP>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <ResendResetPasswordOTPComponent />
                    {
                        mutationIsLoading ? <Button disabled className="gap-2 w-full">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button type="submit" className="gap-2 w-full" onClick={() => onSubmit()}>
                            <SendHorizonal className="h-4 w-4" />
                            <span>Update</span>
                        </Button>
                    }
                </CardFooter>
            </Card>
        </div>
    )
}

const ResendResetPasswordOTPComponent = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const [allowResend, setAllowResend] = React.useState<boolean>(false);

    const handleResendResetPasswordOTP = async () => {
        !mutationIsLoading && await mutate(async () => resendResetPasswordOTP(accessToken));

    }

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    setAllowResend(false);
                    toast.success(mutationData.success);
                }
            }
        }
        handler();
    }, [mutationState])

    return (
        <div className='text-right w-full'>
            <div className='flex w-full justify-end items-center gap-2'>
                {
                    !allowResend && <Countdown
                        date={Date.now() + (1000 * (2))} // 2 minutes
                        renderer={TimerComponent}
                        zeroPadTime={2}
                        onComplete={() => setAllowResend(true)}
                    />
                }
                {
                    mutationIsLoading ? <span className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500 hover:underline cursor-pointer">
                        Resending OTP
                    </span> :
                        <span className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500 hover:underline cursor-pointer" onClick={() => allowResend && handleResendResetPasswordOTP()}>
                            Resend OTP
                        </span>
                }
            </div>
        </div>
    )
}

const TimerComponent = ({ minutes, seconds, completed }: {
    minutes: number,
    seconds: number,
    completed: boolean
}) => {
    if (!completed) {
        return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    } else {
        return <></>
    }
}

const resendResetPasswordOTP = async (access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/reset_password/`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    };

    return await axios.request(options);
}

const resetPassword = async (data: { uid: string, token: string, oldPassword: string, newPassword: string }, access_token: string | undefined) => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/reset_password/`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`
        },
        data: data
    };

    return await axios.request(options);
}

export default ResetPasswordPage;
