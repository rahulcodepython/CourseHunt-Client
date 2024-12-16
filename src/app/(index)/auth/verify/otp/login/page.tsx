"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { useAuthStore } from '@/context/AuthStore'
import useMutation from '@/hooks/useMutation'
import { setCookie } from '@/server/action'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { SendHorizonal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'
import Countdown, { zeroPad } from 'react-countdown';

const VerifyOTPLoginPage = () => {
    const loggedInUser = useAuthStore((state) => state.LoggedInUser);
    const router = useRouter();

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const [value, setValue] = React.useState<string>("")
    const [timeUp, setTimeUp] = React.useState<boolean>(false);

    const onSubmit = async () => {
        if (value.length < 8) {
            return;
        }

        const uid = value.slice(0, 4);
        const token = value.slice(4, 8);
        await mutate(async () => loginUser(uid, token));
    };

    React.useEffect(() => {
        const handler = async () => {
            if (mutationState === 'done') {
                if (mutationIsError) {
                    toast.error(mutationError);
                }
                else {
                    setValue("");
                    loggedInUser(mutationData.access, mutationData.refresh, mutationData.user);
                    router.push('/');
                }
            }
        }
        handler();
    }, [mutationState])

    return (
        <div className='flex flex-col gap-4 items-center justify-center w-screen h-screen'>
            <Card>
                <CardHeader className='flex items-center justify-between w-full flex-row'>
                    <CardTitle>
                        Verify OTP
                    </CardTitle>
                    <span>
                        {
                            !timeUp && <Countdown
                                date={Date.now() + (1000 * (60 * 10))} // 10 minutes
                                renderer={TimerComponent}
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
                    {
                        mutationIsLoading ? <Button disabled className="gap-2 w-full">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button type="submit" className="gap-2 w-full" onClick={() => onSubmit()} disabled={timeUp}>
                            <SendHorizonal className="h-4 w-4" />
                            <span>Verify</span>
                        </Button>
                    }
                </CardFooter>
            </Card>
        </div>
    )
}

const ResendLoginOTPComponent = () => {
    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const [allowResend, setAllowResend] = React.useState<boolean>(false);

    const handleResendLoginOTP = async () => {
        const email = localStorage.getItem('resend_otp_email_login');
        email && !mutationIsLoading && await mutate(async () => resendLoginOTP(email));

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
                        date={Date.now() + (1000 * (60 * 2))} // 2 minutes
                        renderer={TimerComponent}
                        zeroPadTime={2}
                        onComplete={() => setAllowResend(true)}
                    />
                }
                {
                    mutationIsLoading ? <span className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500 hover:underline cursor-pointer">
                        Resending OTP
                    </span> :
                        <span className="text-sm font-semibold text-gray-700 hover:text-gray-500 focus:text-gray-500 hover:underline cursor-pointer" onClick={() => allowResend && handleResendLoginOTP()}>
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

const resendLoginOTP = async (email: string) => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/login/email/resend/`,
        method: 'POST',
        data: {
            email: email
        }
    };

    return await axios.request(options);
}

const loginUser = async (uid: string, token: string) => {
    const options = {
        url: `${process.env.BASE_API_URL}/auth/users/jwt/create/`,
        method: 'POST',
        data: {
            uid: uid,
            token: token
        }
    };

    const response = await axios.request(options);
    localStorage.removeItem('resend_otp_email_login');
    await setCookie('access_token', response.data.access, response.data.access ? (jwtDecode(response.data.access)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0);
    await setCookie('refresh_token', response.data.refresh, response.data.refresh ? (jwtDecode(response.data.refresh)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0);
    await setCookie('user', JSON.stringify(response.data.user));
    return response;
}

export default VerifyOTPLoginPage;
