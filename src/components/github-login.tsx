"use client"
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { redirect } from 'next/navigation'
import React from 'react'

const GithubLogin = () => {
    const handleGithubLogin = async () => {
        const response = await axios.get(`${process.env.BASE_API_URL}/auth/github/auth`)
        const { url } = response.data
        redirect(url)
    }

    return (
        <Button variant="outline" className="w-full cursor-pointer" onClick={() => handleGithubLogin()}>
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            Sign up with GitHub
        </Button>
    )
}

export default GithubLogin
