"use client"
import { setCookie } from '@/app/action'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { urlGenerator } from '@/utils'
import { Link } from 'next-view-transitions'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const GithubCallback = () => {
    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    const router = useRouter()

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

            return await fetch(urlGenerator(`/auth/github/authenticate/?code=${code}&state=${state}`), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (response) => {
                if (response.ok) {
                    const data = await response.json()

                    await setCookie('access', data.access)
                    await setCookie('access', data.refresh)
                } else {
                    const error = await response.json()
                    setErrorMessage(error.error)
                    setError(true)
                }
            }).catch((error) => {
                setErrorMessage(error)
                setError(true)
            }).finally(() => {
                setLoading(false)
            })
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
