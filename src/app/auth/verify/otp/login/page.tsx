"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { useRouter } from 'next/navigation'
import React from 'react'
import Countdown from 'react-countdown';
import { useForm } from 'react-hook-form'
import Timer from '@/components/timer'
import LoadingButton from '@/components/loading-button'
import { loginUser } from '@/app/action'
import axios from 'axios'
import { clientUrlGenerator } from '@/utils'

const VerifyOTPLoginPage = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();

    const { handleSubmit } = useForm();

    const [value, setValue] = React.useState<string>("")
    const [timeUp, setTimeUp] = React.useState<boolean>(false);

    const onSubmit = async () => {
        if (value.length < 8) {
            return;
        }

        const uid = value.slice(0, 4);
        const token = value.slice(4, 8);

        setLoading(true);
        const response = await loginUser(uid, token);

        if (response) {
            localStorage.removeItem('resend_otp_email_login');
            router.push('/');
        } else {
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-center justify-center w-screen h-screen'>
            <Card>
                <CardHeader className='flex items-center justify-between w-full flex-row'>
                    <CardTitle>
                        Verify OTP
                    </CardTitle>
                    <span>
                        {
                            !timeUp && <Countdown
                                date={Date.now() + (1000 * (60 * 10))} // 10 minutes
                                renderer={Timer}
                                zeroPadTime={2}
                                onComplete={() => setTimeUp(true)}
                            />
                        }
                    </span>
                </CardHeader>
                <CardContent>
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
                    <ResendLoginOTPComponent />
                    <LoadingButton loading={loading}>
                        <Button className='w-full'>
                            Verify OTP
                        </Button>
                    </LoadingButton>
                </CardFooter>
            </Card>
        </form>
    )
}

const ResendLoginOTPComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [allowResend, setAllowResend] = React.useState<boolean>(false);

    const handleResendLoginOTP = async () => {
        if (!allowResend) {
            return
        }

        const email = localStorage.getItem('resend_otp_email_login');


        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(clientUrlGenerator('/auth/users/login/email/resend/'), {
                email: email
            })
        } catch { }
        setLoading(false);
    }

    return (
        <div onClick={handleResendLoginOTP} className='text-right w-full'>
            <div className='flex w-full justify-end items-center gap-2'>
                {
                    !allowResend && <Countdown
                        date={Date.now() + (1000 * (60 * 2))} // 2 minutes
                        renderer={Timer}
                        zeroPadTime={2}
                        onComplete={() => setAllowResend(true)}
                    />
                }
                <LoadingButton loading={loading} loadingC={<span className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500 hover:underline cursor-pointer">
                    Resending OTP ...
                </span>}>
                    <span className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500 hover:underline cursor-pointer">
                        Resend OTP
                    </span>
                </LoadingButton>
            </div>
        </div>
    )
}

export default VerifyOTPLoginPage;
