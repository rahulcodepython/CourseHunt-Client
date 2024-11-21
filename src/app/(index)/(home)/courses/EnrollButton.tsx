"use client"
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/context/AuthStore'
import { enrollCourse } from '@/server/action'
import { Link } from 'next-view-transitions'
import React from 'react'

const EnrollButton = ({ id, access_token }: {
    id: string,
    access_token: string | undefined
}) => {
    const user = useAuthStore(state => state.user)

    return (
        // <Button className="w-full" onClick={() => enrollCourse(id, access_token)}>Enroll Now</Button>
        <Link href={`/dashboard/${user?.username}/payment/${id}`}>
            <Button className="w-full">Enroll Now</Button>
        </Link>
    )
}

export default EnrollButton
