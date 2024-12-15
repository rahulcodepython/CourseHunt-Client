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

const VerifyOTPLoginPage = () => {
    const loggedInUser = useAuthStore((state) => state.LoggedInUser);
    const router = useRouter();

    const { mutate, mutationIsLoading, mutationIsError, mutationError, mutationData, mutationState } = useMutation();

    const [value, setValue] = React.useState<string>("")

    const onSubmit = async () => {
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
                <CardHeader>
                    <CardTitle>
                        Verify OTP
                    </CardTitle>
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
                <CardFooter>
                    {
                        mutationIsLoading ? <Button disabled className="gap-2 w-full">
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> : <Button type="submit" className="gap-2 w-full" onClick={() => onSubmit()}>
                            <SendHorizonal className="h-4 w-4" />
                            <span>Verify</span>
                        </Button>
                    }
                </CardFooter>
            </Card>
        </div>
    )
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
    await setCookie('access_token', response.data.access, response.data.access ? (jwtDecode(response.data.access)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0);
    await setCookie('refresh_token', response.data.refresh, response.data.refresh ? (jwtDecode(response.data.refresh)?.exp ?? 0) - Math.floor(Date.now() / 1000) : 0);
    await setCookie('user', JSON.stringify(response.data.user));
    return response;
}

export default VerifyOTPLoginPage;
