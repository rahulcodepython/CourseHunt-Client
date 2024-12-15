"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/context/AuthStore'
import { setCookie } from '@/server/action'
import axios from 'axios'
import { Link } from 'next-view-transitions'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const GithubCallback = () => {
    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    const router = useRouter()

    const loggedInUser = useAuthStore((state) => state.LoggedInUser)

    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<string>('')

    React.useEffect(() => {
        const handle = async () => {
            if (!code) {
                setLoading(false)
                setError(true)
                setErrorMessage('No code found')
                return
            }
            if (!state) {
                setLoading(false)
                setError(true)
                setErrorMessage('No state found')
                return
            }

            try {
                const response = await axios(`${process.env.BASE_API_URL}/auth/github/authenticate/?code=${code}&state=${state}`)
                const data = await response.data

                loggedInUser(data.access, data.refresh, data.user)
                await setCookie('access_token', data.access)
                await setCookie('refresh_token', data.refresh)
                await setCookie('user', JSON.stringify(data.user))

            } catch (error: any) {
                setErrorMessage(error.response?.data?.error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        handle()
    }, [])

    if (loading && !error) {
        return (
            <div className='flex items-center justify-center w-screen h-screen'>
                <Card>
                    <CardContent className='pt-6 flex flex-col gap-4 items-center justify-center'>
                        <span className="text-xl font-bold leading-tight tracking-tight">
                            Authenticating with GitHub ...
                        </span>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!loading && !error) {
        router.push(`/`)
    }

    if (!loading && error) {
        return (
            <div className='flex items-center justify-center w-screen h-screen'>
                <Card>
                    <CardContent className='pt-6 flex flex-col gap-4 items-center justify-center'>
                        <span className="text-xl font-bold leading-tight tracking-tight">
                            An error occurred while trying to authenticate with GitHub
                        </span>
                        <span className="text-sm text-red-500">
                            {errorMessage}
                        </span>
                        <Link href="/auth/login">
                            <Button>
                                Try again
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default GithubCallback
