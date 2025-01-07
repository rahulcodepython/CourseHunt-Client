"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Chrome } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const GoogleLogin = () => {
    const handleGoogleLogin = async () => {
        const response = await axios.get(`${process.env.BASE_API_URL}/auth/google/auth`)
        const { url } = response.data
        redirect(url)
    }

    return (
        <Button variant="outline" className="w-full" onClick={() => handleGoogleLogin()}>
            <Chrome className="mr-2 h-4 w-4" />
            Sign up with Google
        </Button>
    )
}

export default GoogleLogin
