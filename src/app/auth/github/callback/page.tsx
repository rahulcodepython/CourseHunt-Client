"use client"
import { setCookie } from '@/app/action'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { clientUrlGenerator } from '@/utils'
import axios from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

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

            try {
                const response = await axios.get(clientUrlGenerator(`/auth/github/authenticate/?code=${code}&state=${state}`),)
                const data = response.data
                await setCookie('access', data.access)
                await setCookie('refresh', data.refresh)
                toast.success('Successfully authenticated with GitHub')
            } catch (error) {
                setError(true)
                toast.error('An error occurred while trying to authenticate with GitHub')
            }
            setLoading(false)
        }
        handle()
    }, [code, state])

    if (loading && !error) {
        return (
            <Spinner />
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
