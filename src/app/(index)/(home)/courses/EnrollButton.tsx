"use client"
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore'
import { Link } from 'next-view-transitions'
import React from 'react'

const EnrollButton = ({ id, enrolled }: { id: string, enrolled: boolean }) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const user = useAuthStore(state => state.user)

    return isAuthenticated ? enrolled ? <Link href={`/dashboard/${user?.username}/study/${id}/`} className='w-full'>
        <Button className='w-full'>Study</Button>
    </Link> : <Button className="w-full">
        <Link href={`/dashboard/${user?.username}/checkout/${id}`}>Enroll Now</Link>
    </Button> : <Button variant={'destructive'} className='w-full'>
        <Link href="/auth/login">Login to enroll</Link>
    </Button>
}

export default EnrollButton
